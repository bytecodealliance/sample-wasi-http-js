import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/server.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  plugins: [nodeResolve()],
};
