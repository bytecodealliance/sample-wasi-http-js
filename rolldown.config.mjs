import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/server.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
});
