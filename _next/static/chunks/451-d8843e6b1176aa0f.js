"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[451],{3451:(t,e,i)=>{i.d(e,{N:()=>d});var s=i(337);let o={type:"change"},h={type:"start"},a={type:"end"},n=new s.RlV,r=new s.Zcv,l=Math.cos(70*s.cj9.DEG2RAD),c=new s.Pq0,p=2*Math.PI,_={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};class d extends s.H2z{constructor(t,e=null){super(t,e),this.state=_.NONE,this.target=new s.Pq0,this.cursor=new s.Pq0,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:s.kBv.ROTATE,MIDDLE:s.kBv.DOLLY,RIGHT:s.kBv.PAN},this.touches={ONE:s.wtR.ROTATE,TWO:s.wtR.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new s.Pq0,this._lastQuaternion=new s.PTz,this._lastTargetPosition=new s.Pq0,this._quat=new s.PTz().setFromUnitVectors(t.up,new s.Pq0(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new s.YHV,this._sphericalDelta=new s.YHV,this._scale=1,this._panOffset=new s.Pq0,this._rotateStart=new s.I9Y,this._rotateEnd=new s.I9Y,this._rotateDelta=new s.I9Y,this._panStart=new s.I9Y,this._panEnd=new s.I9Y,this._panDelta=new s.I9Y,this._dollyStart=new s.I9Y,this._dollyEnd=new s.I9Y,this._dollyDelta=new s.I9Y,this._dollyDirection=new s.Pq0,this._mouse=new s.I9Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=u.bind(this),this._onPointerDown=m.bind(this),this._onPointerUp=b.bind(this),this._onContextMenu=v.bind(this),this._onMouseWheel=P.bind(this),this._onKeyDown=E.bind(this),this._onTouchStart=D.bind(this),this._onTouchMove=T.bind(this),this._onMouseDown=y.bind(this),this._onMouseMove=g.bind(this),this._interceptControlDown=f.bind(this),this._interceptControlUp=M.bind(this),null!==this.domElement&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){null!==this._domElementKeyEvents&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(o),this.update(),this.state=_.NONE}update(t=null){let e=this.object.position;c.copy(e).sub(this.target),c.applyQuaternion(this._quat),this._spherical.setFromVector3(c),this.autoRotate&&this.state===_.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,h=this.maxAzimuthAngle;isFinite(i)&&isFinite(h)&&(i<-Math.PI?i+=p:i>Math.PI&&(i-=p),h<-Math.PI?h+=p:h>Math.PI&&(h-=p),i<=h?this._spherical.theta=Math.max(i,Math.min(h,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+h)/2?Math.max(i,this._spherical.theta):Math.min(h,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),!0===this.enableDamping?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let t=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=t!=this._spherical.radius}if(c.setFromSpherical(this._spherical),c.applyQuaternion(this._quatInverse),e.copy(this.target).add(c),this.object.lookAt(this.target),!0===this.enableDamping?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let t=null;if(this.object.isPerspectiveCamera){let e=c.length();t=this._clampDistance(e*this._scale);let i=e-t;this.object.position.addScaledVector(this._dollyDirection,i),this.object.updateMatrixWorld(),a=!!i}else if(this.object.isOrthographicCamera){let e=new s.Pq0(this._mouse.x,this._mouse.y,0);e.unproject(this.object);let i=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=i!==this.object.zoom;let o=new s.Pq0(this._mouse.x,this._mouse.y,0);o.unproject(this.object),this.object.position.sub(o).add(e),this.object.updateMatrixWorld(),t=c.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;null!==t&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(t).add(this.object.position):(n.origin.copy(this.object.position),n.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(n.direction))<l?this.object.lookAt(this.target):(r.setFromNormalAndCoplanarPoint(this.object.up,this.target),n.intersectPlane(r,this.target))))}else if(this.object.isOrthographicCamera){let t=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),t!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,!!(a||this._lastPosition.distanceToSquared(this.object.position)>1e-6||8*(1-this._lastQuaternion.dot(this.object.quaternion))>1e-6||this._lastTargetPosition.distanceToSquared(this.target)>1e-6)&&(this.dispatchEvent(o),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0)}_getAutoRotationAngle(t){return null!==t?p/60*this.autoRotateSpeed*t:p/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(.01*t);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){c.setFromMatrixColumn(e,0),c.multiplyScalar(-t),this._panOffset.add(c)}_panUp(t,e){!0===this.screenSpacePanning?c.setFromMatrixColumn(e,1):(c.setFromMatrixColumn(e,0),c.crossVectors(this.object.up,c)),c.multiplyScalar(t),this._panOffset.add(c)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;c.copy(s).sub(this.target);let o=c.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*o/i.clientHeight,this.object.matrix),this._panUp(2*e*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,o=e-i.top,h=i.width,a=i.height;this._mouse.x=s/h*2-1,this._mouse.y=-(o/a*2)+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(p*this._rotateDelta.x/e.clientHeight),this._rotateUp(p*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(p*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-p*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(p*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-p*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(1===this._pointers.length)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(1===this._pointers.length)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,o=Math.sqrt(i*i+s*s);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(1==this._pointers.length)this._rotateEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(p*this._rotateDelta.x/e.clientHeight),this._rotateUp(p*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(1===this._pointers.length)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,o=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let h=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(h,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];void 0===e&&(e=new s.I9Y,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function m(t){!1!==this.enabled&&(0===this._pointers.length&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),this._isTrackingPointer(t)||(this._addPointer(t),"touch"===t.pointerType?this._onTouchStart(t):this._onMouseDown(t)))}function u(t){!1!==this.enabled&&("touch"===t.pointerType?this._onTouchMove(t):this._onMouseMove(t))}function b(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(a),this.state=_.NONE;break;case 1:let e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y})}}function y(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case s.kBv.DOLLY:if(!1===this.enableZoom)return;this._handleMouseDownDolly(t),this.state=_.DOLLY;break;case s.kBv.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===this.enablePan)return;this._handleMouseDownPan(t),this.state=_.PAN}else{if(!1===this.enableRotate)return;this._handleMouseDownRotate(t),this.state=_.ROTATE}break;case s.kBv.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===this.enableRotate)return;this._handleMouseDownRotate(t),this.state=_.ROTATE}else{if(!1===this.enablePan)return;this._handleMouseDownPan(t),this.state=_.PAN}break;default:this.state=_.NONE}this.state!==_.NONE&&this.dispatchEvent(h)}function g(t){switch(this.state){case _.ROTATE:if(!1===this.enableRotate)return;this._handleMouseMoveRotate(t);break;case _.DOLLY:if(!1===this.enableZoom)return;this._handleMouseMoveDolly(t);break;case _.PAN:if(!1===this.enablePan)return;this._handleMouseMovePan(t)}}function P(t){!1!==this.enabled&&!1!==this.enableZoom&&this.state===_.NONE&&(t.preventDefault(),this.dispatchEvent(h),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(a))}function E(t){!1!==this.enabled&&this._handleKeyDown(t)}function D(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case s.wtR.ROTATE:if(!1===this.enableRotate)return;this._handleTouchStartRotate(t),this.state=_.TOUCH_ROTATE;break;case s.wtR.PAN:if(!1===this.enablePan)return;this._handleTouchStartPan(t),this.state=_.TOUCH_PAN;break;default:this.state=_.NONE}break;case 2:switch(this.touches.TWO){case s.wtR.DOLLY_PAN:if(!1===this.enableZoom&&!1===this.enablePan)return;this._handleTouchStartDollyPan(t),this.state=_.TOUCH_DOLLY_PAN;break;case s.wtR.DOLLY_ROTATE:if(!1===this.enableZoom&&!1===this.enableRotate)return;this._handleTouchStartDollyRotate(t),this.state=_.TOUCH_DOLLY_ROTATE;break;default:this.state=_.NONE}break;default:this.state=_.NONE}this.state!==_.NONE&&this.dispatchEvent(h)}function T(t){switch(this._trackPointer(t),this.state){case _.TOUCH_ROTATE:if(!1===this.enableRotate)return;this._handleTouchMoveRotate(t),this.update();break;case _.TOUCH_PAN:if(!1===this.enablePan)return;this._handleTouchMovePan(t),this.update();break;case _.TOUCH_DOLLY_PAN:if(!1===this.enableZoom&&!1===this.enablePan)return;this._handleTouchMoveDollyPan(t),this.update();break;case _.TOUCH_DOLLY_ROTATE:if(!1===this.enableZoom&&!1===this.enableRotate)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=_.NONE}}function v(t){!1!==this.enabled&&t.preventDefault()}function f(t){"Control"===t.key&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function M(t){"Control"===t.key&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}}}]);