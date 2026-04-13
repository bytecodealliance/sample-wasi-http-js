# Sample: `wasi:http` in JavaScript

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/bytecodealliance/sample-wasi-http-js)

An example project showing how to build a spec-compliant
[`wasi:http/proxy`][wasi-http] server for WASI 0.2 written in JavaScript.

## Routes

The following HTTP routes are available from the component:

```text
/               # Hello world
/sleep          # Sleep for {ms} milliseconds
/echo           # Echo the HTTP body
/echo-headers   # Echo the HTTP headers
/upload         # Echo uploaded blob
```

Testing routes:

```bash
# Hello world
$ curl localhost:8080
# Sleep for {ms} milliseconds
$ curl localhost:8080/sleep/2000
# Echo the HTTP body
$ curl -d "Test echo body" localhost:8080/echo
# Echo the HTTP headers
$ curl -H "X-Test-Header: 123" localhost:8080/echo-headers
# Echo uploaded blob
$ echo "Hello World!" > test_file.txt
$ curl -H "Content-Type: text/plain" --data-binary @test_file.txt http://localhost:8080/upload
```

## Quick Start

The project uses [`Wasmtime`][wasmtime] as its runtime. However, if needed, it
can easily be adjusted to use [`jco`][jco] instead. For `wasmtime` installation,
simply run:

```bash
$ curl https://wasmtime.dev/install.sh -sSf | bash
```

To build and serve the wasm component on `localhost:8080`:

```bash
$ npm install
$ npm run serve
```

Then send requests to the component:

```bash
$ curl localhost:8080
```

## Development

```bash
$ npm run build       # Build the wasm component
$ npm test            # Run tests
$ npm run fmt         # Format code
$ npm run fmt:check   # Check formatting
$ npm run lint        # Lint code
$ npm run wit:fetch   # Fetch WIT dependencies
$ npm run wit:update  # Update WIT lock file
```

## See Also

- [sample-wasi-http-rust][rust-sample] An example `wasi:http` server component written in Rust.

## License

Apache-2.0 with LLVM Exception

[jco]: https://github.com/bytecodealliance/jco
[rust-sample]: https://github.com/bytecodealliance/sample-wasi-http-rust
[wasi-http]: https://github.com/WebAssembly/wasi-http
[wasmtime]: https://wasmtime.dev/
