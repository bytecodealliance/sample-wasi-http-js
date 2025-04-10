# Sample: `wasi:http` in JavaScript

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/andreiltd/sample-wasi-http-js)

An example project showing how to build a spec-compliant
[`wasi:http/proxy`][wasi-http] server for WASI 0.2 written in JavaScript.

Check also the sibling Rust project [`sample-wasi-http-rust`][rust-sample]

## Routes

The following HTTP routes are available from the component:

```text
/               # Hello world
/sleep          # Sleep for {ms} milliseconds
/echo           # Echo the HTTP body
/echo-headers   # Echo the HTTP headers
/echo-trailers  # Echo the HTTP trailers
/upload         # Echo uploaded blob 
```

## Quick Start
The project uses [`Wasmtime`][wasmtime] as its runtime. However, if needed, it 
can easily be adjusted to use [`jco`][jco] instead. For `wasmtime` installation, 
simply run:

```bash
$ curl https://wasmtime.dev/install.sh -sSf | bash
```

The quickest way to start is by using [`just`][just]. 
```bash
$ just serve # to build and serve the wasm component on `localhost:8080`
$ curl 127.0.0.1:8080 # to send requests to component.
```

Alternatively, run:

```bash
$ npm install
$ npm build
$ wasmtime serve -S common dist/server.component.wasm
```

## License

Apache-2.0 with LLVM Exception

[jco]: https://github.com/bytecodealliance/jco
[just]: https://github.com/casey/just
[rust-sample]: https://github.com/bytecodealliance/sample-wasi-http-rust 
[wasi-http]: https://github.com/WebAssembly/wasi-http
[wasmtime]: https://wasmtime.dev/ 
