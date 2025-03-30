dev:
	bun run dev --port 3001

install: bun.lockb
	bun install --frozen-lockfile

bun.lockb: package.json
	bun install

bun-build: install
	bun run build:static
