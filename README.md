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

The quickest way to start is by using [`just`][just].
```bash
$ just serve # to build and serve the wasm component on `localhost:8080`
$ curl localhost:8080 # to send requests to component.
```

Alternatively, run:

```bash
$ npm install
$ npm run build
$ wasmtime serve -S common dist/sample-wasi-http-js.wasm
```
## Debugging in VSCode

You can debug by installing the [StarlingMonkey debugger extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=BytecodeAlliance.starlingmonkey-debugger). [Componentize-js](https://github.com/bytecodealliance/componentize-js) is the compile tool that bundles the JavaScript application into a single .js file according to the `rollup.config.js` file, creates a WebAssembly module with the SpiderMonkey JavaScript engine, and then creates a component with both modules inside. For details, see the `build` and `build:debug` scripts in the `package.json` file in the root folder.

> NOTE: At this time, the debug extension requires both a StarlingMonkey component with debugging enabled, using `componentize-js` and the `--enable-script-debugging` runtime argument flag. In addition, to attach the debugger to the SpiderMonkey debugging API inside the StarlingMonkey WebAssembly component, the following additional interfaces need to be built into the debug version of the component:

```bash
import wasi:cli/environment@0.2.3;
import wasi:sockets/network@0.2.3;
import wasi:sockets/instance-network@0.2.3;
import wasi:sockets/tcp@0.2.3;
import wasi:sockets/tcp-create-socket@0.2.3;
```

At the moment, the extension does not add these interfaces for you; to add these interfaces, a replica of the WIT directory with a modified `server.wit` file is included in the `wit-debug` directory. When you start the StarlingMonkey debugger by selecting the `Run` menu and then `Start Debugging` (or press `F5`), the `tasks.json` file executes `npm run build:debug`, which compiles the modified WIT file to build the debug version of the component automatically.

Following a successful build, the StarlingMonkey debugger will launch `wasmtime` to serve the debug version of the component. Set a breakpoint on the JavaScript in the bundled version of your code, in dist/bundle.js, as that is the file that StarlingMonkey will be executing inside the component.


## See Also

- [sample-wasi-http-rust][rust-sample] An example `wasi:http` server component written in Rust.

## License

Apache-2.0 with LLVM Exception

[jco]: https://github.com/bytecodealliance/jco
[just]: https://github.com/casey/just
[rust-sample]: https://github.com/bytecodealliance/sample-wasi-http-rust
[wasi-http]: https://github.com/WebAssembly/wasi-http
[wasmtime]: https://wasmtime.dev/
