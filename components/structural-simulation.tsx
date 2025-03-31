"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import React from "react"

// Simple SVG Plot Component - Updated for Responsiveness
interface ForcePlotProps {
  data: number[];
  height?: number;
  color?: string;
}

const ForcePlot: React.FC<ForcePlotProps> = ({
  data,
  height = 50, // Keep height fixed for simplicity
  color = "#9ca3af",
}) => {
  // Reference aspect ratio width (used for internal calculations)
  const referenceWidth = 450;

  if (!data || data.length < 2) {
    return (
      // Use viewBox and width=100%
      <svg width="100%" height={height} viewBox={`0 0 ${referenceWidth} ${height}`} className="bg-gray-800 rounded border border-gray-700">
        <text x={referenceWidth / 2} y={height / 2} fill="#9ca3af" textAnchor="middle" dy=".3em" fontSize="10">
          Waiting for data...
        </text>
      </svg>
    );
  }

  // Calculations now use referenceWidth and fixed height
  const padding = 5;
  const labelPaddingX = 3;
  const labelOffsetY = 4;
  const plotWidth = referenceWidth - 2 * padding; // Use referenceWidth for calc
  const plotHeight = height - 2 * padding;

  const currentMax = Math.max(...data);
  const currentMin = Math.min(...data);

  const range = currentMax - currentMin;
  const paddingY = Math.min(range * 0.1, currentMax * 0.5 + 1e-5);

  let plotMaxY = currentMax + paddingY;
  let plotMinY = Math.max(0, currentMin - paddingY);
  plotMaxY = Math.max(plotMaxY, 1e-8);

  const plotRangeY = plotMaxY - plotMinY;
  const effectivePlotRangeY = Math.max(plotRangeY, 1e-7);

  // Points calculation uses plotWidth based on referenceWidth
  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * plotWidth;
      const y = height - padding - ((value - plotMinY) / effectivePlotRangeY) * plotHeight;
      const clampedY = Math.max(padding, Math.min(height - padding, y));
      return `${x.toFixed(2)},${clampedY.toFixed(2)}`;
    })
    .join(" ");

  const formatLabel = (value: number) => {
      if (value === 0) return "0";
      if (Math.abs(value) < 1e-3 || Math.abs(value) >= 1e4) return value.toExponential(1);
      if (Math.abs(value) < 0.1) return value.toPrecision(1);
      return value.toFixed(1);
  }
  const maxLabel = formatLabel(plotMaxY);
  const minLabel = formatLabel(plotMinY);

  // SVG uses viewBox and width=100%
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${referenceWidth} ${height}`} className="bg-gray-800 rounded border border-gray-700">
       {/* Labels positioned relative to viewBox coordinates */}
       <text x={padding + labelPaddingX} y={padding + labelOffsetY} fill="#9ca3af" fontSize="8" textAnchor="start" dy=".3em">
         {maxLabel}
       </text>
       <text x={padding + labelPaddingX} y={height - padding} fill="#9ca3af" fontSize="8" textAnchor="start" dy=".3em">
         {minLabel}
       </text>
       <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default function StructuralSimulation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null)
  const pointsGeometryRef = useRef<THREE.BufferGeometry | null>(null)
  const meshRef = useRef<THREE.LineSegments | null>(null)
  const originalPositionsRef = useRef<Float32Array | null>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const fixedVerticesRef = useRef<Set<number>>(new Set())
  const isDraggingRef = useRef(false)
  const selectedPointRef = useRef(-1)
  const animationFrameIdRef = useRef<number | null>(null)
  const [forceHistory, setForceHistory] = useState<number[]>([])
  const MAX_FORCE_HISTORY = 600

  // State for UI controls
  const [springConstant, setSpringConstant] = useState(0.001);
  const [neighborSpringConstant, setNeighborSpringConstant] = useState(0);
  const [damping, setDamping] = useState(1.0);
  const [maxDisplacement, setMaxDisplacement] = useState(0.1);

  // --- Refs to hold the latest physics values for use in animation loop ---
  const springConstantRef = useRef(springConstant);
  const neighborSpringConstantRef = useRef(neighborSpringConstant);
  const dampingRef = useRef(damping);
  const maxDisplacementRef = useRef(maxDisplacement);

  // --- Effect to update refs when state changes ---
  useEffect(() => {
    springConstantRef.current = springConstant;
  }, [springConstant]);

  useEffect(() => {
    neighborSpringConstantRef.current = neighborSpringConstant;
  }, [neighborSpringConstant]);

  useEffect(() => {
    dampingRef.current = damping;
  }, [damping]);

  useEffect(() => {
    maxDisplacementRef.current = maxDisplacement;
  }, [maxDisplacement]);

  const resetSimulation = () => {
    if (
      !geometryRef.current ||
      !pointsGeometryRef.current ||
      !originalPositionsRef.current ||
      !velocitiesRef.current ||
      !meshRef.current ||
      !controlsRef.current
    )
      return

    const positions = geometryRef.current.attributes.position.array as Float32Array
    const pointsPositions = pointsGeometryRef.current.attributes.position.array as Float32Array

    // Reset positions to original
    positions.set(originalPositionsRef.current)
    pointsPositions.set(originalPositionsRef.current)

    // Reset velocities
    velocitiesRef.current.fill(0)

    // Clear force history
    setForceHistory([])

    // Mark attributes for update
    geometryRef.current.attributes.position.needsUpdate = true
    pointsGeometryRef.current.attributes.position.needsUpdate = true

    // Update the wireframe
    meshRef.current.geometry.dispose()
    meshRef.current.geometry = new THREE.WireframeGeometry(geometryRef.current)

    // Reset interaction state
    isDraggingRef.current = false
    selectedPointRef.current = -1
    controlsRef.current.enabled = true

    console.log("Simulation reset")
  }

  // Mouse event handlers (depend on refs, maxDisplacement state)
  const onMouseDown = (event: MouseEvent) => {
    if (!rendererRef.current || !cameraRef.current || !sceneRef.current || !pointsGeometryRef.current || !fixedVerticesRef.current || !controlsRef.current) return;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster(); // Raycaster can be local if only used here
    raycaster.params.Points.threshold = 0.5;
    raycaster.setFromCamera(mouse, cameraRef.current);

    const pointsObject = sceneRef.current?.children.find((obj: THREE.Object3D) => obj instanceof THREE.Points) as THREE.Points | undefined;
    if (!pointsObject) return;

    const intersects = raycaster.intersectObject(pointsObject);

    if (intersects.length > 0) {
      const pointIndex = intersects[0].index * 3;
      if (!fixedVerticesRef.current.has(pointIndex)) {
        isDraggingRef.current = true;
        controlsRef.current.enabled = false; // Disable OrbitControls
        selectedPointRef.current = pointIndex;
      }
    }
  };

  const onMouseMove = (event: MouseEvent) => {
     if (!isDraggingRef.current || selectedPointRef.current === -1 || !rendererRef.current || !cameraRef.current || !geometryRef.current || !pointsGeometryRef.current || !originalPositionsRef.current || !meshRef.current) return;

     const rect = rendererRef.current.domElement.getBoundingClientRect();
     const mouse = new THREE.Vector2();
     mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
     mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

     const raycaster = new THREE.Raycaster(); // Raycaster can be local
     raycaster.params.Points.threshold = 0.5; // Sync threshold if needed elsewhere
     raycaster.setFromCamera(mouse, cameraRef.current);

     const planeNormal = new THREE.Vector3(0, 0, 1);
     const planeConstant = 0;
     const plane = new THREE.Plane(planeNormal, planeConstant);
     const targetPoint = new THREE.Vector3();

     if (raycaster.ray.intersectPlane(plane, targetPoint)) { // Check if intersection occurred
        // Limit displacement
        const originalX = originalPositionsRef.current[selectedPointRef.current];
        const originalY = originalPositionsRef.current[selectedPointRef.current + 1];

        const dx = targetPoint.x - originalX;
        const dy = targetPoint.y - originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Use maxDisplacement state variable here
        if (distance > maxDisplacementRef.current) {
            const scale = maxDisplacementRef.current / distance;
            targetPoint.x = originalX + dx * scale;
            targetPoint.y = originalY + dy * scale;
        }

        // Update positions
        const positions = geometryRef.current.attributes.position.array as Float32Array;
        const pointsPositions = pointsGeometryRef.current.attributes.position.array as Float32Array;

        positions[selectedPointRef.current] = targetPoint.x;
        positions[selectedPointRef.current + 1] = targetPoint.y;
        // Keep z the same or update if needed: positions[selectedPointRef.current + 2] = targetPoint.z;

        pointsPositions[selectedPointRef.current] = targetPoint.x;
        pointsPositions[selectedPointRef.current + 1] = targetPoint.y;
        // pointsPositions[selectedPointRef.current + 2] = targetPoint.z;

        geometryRef.current.attributes.position.needsUpdate = true;
        pointsGeometryRef.current.attributes.position.needsUpdate = true;

        // Update wireframe (consider performance implications if dragging fast)
        if (meshRef.current) {
            meshRef.current.geometry.dispose();
            meshRef.current.geometry = new THREE.WireframeGeometry(geometryRef.current);
        }
     }
  };

  const onMouseUp = () => {
    if (controlsRef.current) {
        isDraggingRef.current = false;
        selectedPointRef.current = -1;
        controlsRef.current.enabled = true; // Re-enable OrbitControls
    }
  };

  // Animation function (depends on refs and state: springConstant, neighborSpringConstant, damping, maxDisplacement)
  const animate = () => {
    animationFrameIdRef.current = requestAnimationFrame(animate); // Schedule next frame

    if (!geometryRef.current || !pointsGeometryRef.current || !velocitiesRef.current || !originalPositionsRef.current || !fixedVerticesRef.current || !meshRef.current || !controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    let totalInternalForceThisFrame = 0;

    if (!isDraggingRef.current) {
        const positions = geometryRef.current.attributes.position.array as Float32Array;
        const pointsPositions = pointsGeometryRef.current.attributes.position.array as Float32Array;
        const v = velocitiesRef.current;
        const op = originalPositionsRef.current;
        const fixed = fixedVerticesRef.current;

        const fixedIndicesArray = Array.from(fixed); // Keep this, efficient enough

        // Neighbours map - assumed stable, created in useEffect
        // If neighbors could change, this map needs to be updated or passed differently
        const neighbors = (sceneRef.current as any).userData.neighbors as Map<number, number[]>; // Retrieve from scene userData

        for (let i = 0; i < positions.length; i += 3) {
            let vertexInternalForce = 0;
            if (i === selectedPointRef.current || fixed.has(i)) continue;

            const dx_orig = positions[i] - op[i];
            const dy_orig = positions[i + 1] - op[i + 1];
            const dz_orig = positions[i + 2] - op[i + 2];
            const displacementMag_orig = Math.sqrt(dx_orig * dx_orig + dy_orig * dy_orig + dz_orig * dz_orig);

            // Use springConstant from state
            const currentSpringK = springConstantRef.current;
            const restoringForceMag = currentSpringK * displacementMag_orig;
            vertexInternalForce += restoringForceMag;

            const acceleration = {
                x: -currentSpringK * dx_orig,
                y: -currentSpringK * dy_orig,
                z: -currentSpringK * dz_orig,
            };

            const neighborIndices = neighbors.get(i) || [];
            for (const neighborIndex of neighborIndices) {
                if (neighborIndex === -1) continue;
                const dx_neigh = positions[i] - positions[neighborIndex];
                const dy_neigh = positions[i + 1] - positions[neighborIndex + 1];
                const dz_neigh = positions[i + 2] - positions[neighborIndex + 2];
                const currentDist = Math.sqrt(dx_neigh * dx_neigh + dy_neigh * dy_neigh + dz_neigh * dz_neigh);

                const odx = op[i] - op[neighborIndex];
                const ody = op[i + 1] - op[neighborIndex + 1];
                const odz = op[i + 2] - op[neighborIndex + 2];
                const originalDist = Math.sqrt(odx * odx + ody * ody + odz * odz);

                const stretch = currentDist - originalDist;
                // Use neighborSpringConstant from state
                const currentNeighborK = neighborSpringConstantRef.current;
                const neighborForceMag = currentNeighborK * Math.abs(stretch);
                vertexInternalForce += neighborForceMag;

                const forceDirX = currentDist > 1e-6 ? dx_neigh / currentDist : 0;
                const forceDirY = currentDist > 1e-6 ? dy_neigh / currentDist : 0;
                const forceDirZ = currentDist > 1e-6 ? dz_neigh / currentDist : 0;

                acceleration.x -= currentNeighborK * stretch * forceDirX;
                acceleration.y -= currentNeighborK * stretch * forceDirY;
                acceleration.z -= currentNeighborK * stretch * forceDirZ;
            }

            v[i] += acceleration.x;
            v[i + 1] += acceleration.y;
            v[i + 2] += acceleration.z;

            // Use damping from state
            const currentDamping = dampingRef.current;
            v[i] *= currentDamping;
            v[i + 1] *= currentDamping;
            v[i + 2] *= currentDamping;

            positions[i] += v[i];
            positions[i + 1] += v[i + 1];
            positions[i + 2] += v[i + 2];

            const dx_disp = positions[i] - op[i];
            const dy_disp = positions[i + 1] - op[i + 1];
            const dz_disp = positions[i + 2] - op[i + 2];
            const distance_disp = Math.sqrt(dx_disp * dx_disp + dy_disp * dy_disp + dz_disp * dz_disp);

            // Use maxDisplacement from state
            const currentMaxDisp = maxDisplacementRef.current;
            if (distance_disp > currentMaxDisp) {
                const scale = currentMaxDisp / distance_disp;
                positions[i] = op[i] + dx_disp * scale;
                positions[i + 1] = op[i + 1] + dy_disp * scale;
                positions[i + 2] = op[i + 2] + dz_disp * scale;
                v[i] *= 0.5;
                v[i + 1] *= 0.5;
                v[i + 2] *= 0.5;
            }

            totalInternalForceThisFrame += vertexInternalForce;
            pointsPositions[i] = positions[i];
            pointsPositions[i + 1] = positions[i + 1];
            pointsPositions[i + 2] = positions[i + 2];
        }

        for (const index of fixedIndicesArray) {
            positions[index] = op[index];
            positions[index + 1] = op[index + 1];
            positions[index + 2] = op[index + 2];
            pointsPositions[index] = op[index];
            pointsPositions[index + 1] = op[index + 1];
            pointsPositions[index + 2] = op[index + 2];
            v[index] = 0;
            v[index + 1] = 0;
            v[index + 2] = 0;
        }

        geometryRef.current.attributes.position.needsUpdate = true;
        pointsGeometryRef.current.attributes.position.needsUpdate = true;

        if (meshRef.current) {
            meshRef.current.geometry.dispose();
            meshRef.current.geometry = new THREE.WireframeGeometry(geometryRef.current);
        }

        setForceHistory(prevHistory => {
            const newHistory = [...prevHistory, totalInternalForceThisFrame];
            return newHistory.length > MAX_FORCE_HISTORY
                   ? newHistory.slice(newHistory.length - MAX_FORCE_HISTORY)
                   : newHistory;
        });
    }

    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  // Handle window resize (depends on refs)
  const handleResize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
    const currentContainerResize = containerRef.current;
    const width = currentContainerResize.clientWidth;
    const height = currentContainerResize.clientHeight;

    if (width > 0 && height > 0) { // Ensure valid dimensions
        const aspectResize = width / height;
        cameraRef.current.aspect = aspectResize;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
    }
  };

  // --- useEffect for setup and cleanup ---
  useEffect(() => {
    if (!containerRef.current) return;
    const currentContainer = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    // Initial aspect ratio calculation
    const initialAspect = currentContainer.clientWidth / currentContainer.clientHeight || 1; // Avoid NaN
    const camera = new THREE.PerspectiveCamera(60, initialAspect, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    // Initial size calculation
    renderer.setSize(currentContainer.clientWidth || 100, currentContainer.clientHeight || 100); // Avoid 0x0
    currentContainer.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1; // Match value if needed

    // Mesh parameters
    const width = 10;
    const height = 5;
    const widthSegments = 20;
    const heightSegments = 10;

    // Geometry
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    geometryRef.current = geometry;

    // Points
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometryRef.current = pointsGeometry;
    pointsGeometry.setAttribute("position", geometry.attributes.position.clone());
    const pointsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, sizeAttenuation: true });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Wireframe
    const material = new THREE.LineBasicMaterial({ color: 0x888888, linewidth: 1 });
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const mesh = new THREE.LineSegments(wireframeGeometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    // Initial Physics setup
    const originalPositions = new Float32Array(geometry.attributes.position.array.length);
    originalPositions.set(geometry.attributes.position.array);
    originalPositionsRef.current = originalPositions;
    velocitiesRef.current = new Float32Array(geometry.attributes.position.array.length).fill(0);

    // Fixed vertices setup
    const fixedVertices = new Set<number>();
    fixedVerticesRef.current = fixedVertices;
    for (let j = 0; j <= heightSegments; j++) {
      const index = j * (widthSegments + 1) * 3;
      fixedVertices.add(index);
    }

    // Neighbor map setup - store in scene's userData for access in animate
    const neighbors = new Map<number, number[]>();
    scene.userData.neighbors = neighbors; // Attach map to scene
    const getVertexIndex = (i: number, j: number, ws: number, hs: number): number => {
        if (i < 0 || i > ws || j < 0 || j > hs) return -1;
        return (j * (ws + 1) + i) * 3;
    };
     for (let j = 0; j <= heightSegments; j++) {
      for (let i = 0; i <= widthSegments; i++) {
        const index = getVertexIndex(i, j, widthSegments, heightSegments);
        if (index === -1) continue;
        const neighborIndices: number[] = [];
        const directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
        for (const [dx, dy] of directions) {
          const neighborIndex = getVertexIndex(i + dx, j + dy, widthSegments, heightSegments);
          if (neighborIndex !== -1) {
            neighborIndices.push(neighborIndex);
          }
        }
        neighbors.set(index, neighborIndices);
      }
    }

    // --- Apply Initial Random Displacement ---
    const positions = geometry.attributes.position.array as Float32Array;
    const pointsPositions = pointsGeometry.attributes.position.array as Float32Array;
    const numVertices = geometry.attributes.position.count;
    const movableIndices: number[] = [];

    for (let i = 0; i < numVertices; i++) {
        const arrayIndex = i * 3;
        if (!fixedVertices.has(arrayIndex)) {
            movableIndices.push(arrayIndex);
        }
    }

    // Shuffle movable indices (Fisher-Yates shuffle)
    for (let i = movableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [movableIndices[i], movableIndices[j]] = [movableIndices[j], movableIndices[i]];
    }

    // Select first 9 (or fewer if not enough movable vertices)
    const numToDisplace = Math.min(1, movableIndices.length);
    const displacementScale = 0.1; // Small displacement factor

    for (let i = 0; i < numToDisplace; i++) {
        const idx = movableIndices[i];
        // These lines generate NEW random numbers for EACH vertex in the loop
        const dx = (Math.random() - 0.5) * 2 * displacementScale;
        const dy = (Math.random() - 0.5) * 2 * displacementScale;

        // Apply the unique dx, dy to this specific vertex
        positions[idx] += dx;
        positions[idx + 1] += dy;
        pointsPositions[idx] += dx;
        pointsPositions[idx + 1] += dy;
    }

    // Mark buffers as needing update for the initial frame
    geometry.attributes.position.needsUpdate = true;
    pointsGeometry.attributes.position.needsUpdate = true;
    // --- End Initial Displacement ---

    // Call handleResize once initially
    handleResize();

    // Add event listeners using the functions defined outside
    window.addEventListener("resize", handleResize);
    const currentRendererDomElement = renderer.domElement; // Capture for cleanup
    currentRendererDomElement.addEventListener("mousedown", onMouseDown);
    currentRendererDomElement.addEventListener("mousemove", onMouseMove);
    currentRendererDomElement.addEventListener("mouseup", onMouseUp);
    currentRendererDomElement.addEventListener("mouseleave", onMouseUp); // Handle leaving canvas

    // Start animation loop
    animate(); // Initial call

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      currentRendererDomElement.removeEventListener("mousedown", onMouseDown);
      currentRendererDomElement.removeEventListener("mousemove", onMouseMove);
      currentRendererDomElement.removeEventListener("mouseup", onMouseUp);
      currentRendererDomElement.removeEventListener("mouseleave", onMouseUp);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      // Dispose Three.js objects
      geometryRef.current?.dispose();
      pointsGeometryRef.current?.dispose();
      material?.dispose(); // Assuming material is stable or disposed correctly
      pointsMaterial?.dispose();
      wireframeGeometry?.dispose(); // This might be redundant if mesh disposes its geometry
      meshRef.current?.geometry.dispose();
      meshRef.current?.material.dispose(); // Also dispose mesh material if unique
      controlsRef.current?.dispose();
      rendererRef.current?.dispose();
      // Clean up scene children if necessary (lights, points, mesh)
      while(scene.children.length > 0){
          scene.remove(scene.children[0]);
      }

      // Remove the canvas element
      if (currentContainer && rendererRef.current) {
         // Check if the child is still there before removing
         if (currentContainer.contains(rendererRef.current.domElement)) {
             currentContainer.removeChild(rendererRef.current.domElement);
         }
      }

      // Optional: Null out refs if needed, though React manages component scope
      // rendererRef.current = null; // etc.
    };
  }, []); // Empty dependency array is correct here for mount/unmount logic

  return (
     // Main vertical flex container
     <div className="flex flex-col h-full w-full overflow-hidden bg-black text-gray-300">

       {/* Top: Plot Section */}
       <div className="flex-shrink-0 p-4 flex justify-center">
         <div className="flex flex-col items-center w-full max-w-[450px] min-w-0">
           <span className="text-xs text-gray-400 mb-1">Total Internal Force</span>
           <ForcePlot data={forceHistory} height={50} color="#60a5fa" />
         </div>
       </div>

       {/* Middle: Canvas Section */}
       <div className="flex-grow min-h-0 relative w-full">
         {/* Container for Three.js canvas */}
         <div ref={containerRef} className="absolute inset-0" />
       </div>

       {/* Controls Section */}
       <div className="flex-shrink-0 p-2 flex justify-center">
         <div className="grid grid-cols-3 gap-x-4 gap-y-1 w-full max-w-lg"> {/* Increased width */}
           {/* Spring Constant Slider */}
           <label htmlFor="spring" className="text-xs col-span-1 text-right">Spring K:</label>
           <input
             type="range" id="spring" min="0.001" max="0.2" step="0.001"
             value={springConstant} onChange={(e) => setSpringConstant(parseFloat(e.target.value))}
             className="col-span-1 h-4 accent-gray-500"
           />
           <span className="text-xs col-span-1">{springConstant.toFixed(3)}</span>

           {/* Neighbor Spring Constant Slider */}
           <label htmlFor="neighborSpring" className="text-xs col-span-1 text-right">Neighbor K:</label>
           <input
             type="range" id="neighborSpring" min="0" max="0.1" step="0.001"
             value={neighborSpringConstant} onChange={(e) => setNeighborSpringConstant(parseFloat(e.target.value))}
             className="col-span-1 h-4 accent-gray-500"
           />
           <span className="text-xs col-span-1">{neighborSpringConstant.toFixed(3)}</span>

           {/* Damping Slider */}
           <label htmlFor="damping" className="text-xs col-span-1 text-right">Damping:</label>
           <input
             type="range" id="damping" min="0.8" max="1.0" step="0.001"
             value={damping} onChange={(e) => setDamping(parseFloat(e.target.value))}
             className="col-span-1 h-4 accent-gray-500"
           />
           <span className="text-xs col-span-1">{damping.toFixed(3)}</span>

           {/* Max Displacement Slider */}
           <label htmlFor="maxDisp" className="text-xs col-span-1 text-right">Max Disp:</label>
           <input
             type="range" id="maxDisp" min="0.01" max="1.0" step="0.01"
             value={maxDisplacement} onChange={(e) => setMaxDisplacement(parseFloat(e.target.value))}
             className="col-span-1 h-4 accent-gray-500"
           />
           <span className="text-xs col-span-1">{maxDisplacement.toFixed(2)}</span>
         </div>
       </div>

       {/* Bottom: Reset Button Section */}
       <div className="flex-shrink-0 p-4 flex justify-center">
         <button
           onClick={resetSimulation}
           className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
         >
           Reset Simulation
         </button>
       </div>

     </div>
   );
}

