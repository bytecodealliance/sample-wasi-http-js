alias b := build

# List all recipes
default:
    @just --list

# Fetch dependencies for server component
[group('wit')]
fetch-wit:
    wkg wit fetch

# Update the lock file with the latest dependencies
[group('wit')]
update-wit:
    wkg wit update

# Build specified target or all otherwise
build:
    @echo 'Building guest...'
    npm install
    npm run build

# Run all tests
test: build
    @echo 'Running tests...'
    npm test

serve: build
    @echo 'Serving guest...'
    wasmtime serve -S common dist/server.component.wasm
