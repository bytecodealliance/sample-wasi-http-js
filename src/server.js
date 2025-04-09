// https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from "itty-router";

import { sleep } from "./endpoints/sleep.js";
import { upload } from "./endpoints/upload.js";
import { echo, echoHeaders, echoTrailers } from "./endpoints/echo.js";

let router = AutoRouter();

router
  .get("/", () => new Response("Hello, World!"))
  .get("/echo-headers", (req) => echoHeaders(req))
  .get("/echo-trailers", (req) => echoTrailers(req))
  .get("/sleep/:ms", async ({ ms }) => await sleep(ms))
  .post("/echo", (req) => echo(req))
  .post("/upload", async (req) => await upload(req));

addEventListener("fetch", async (event) => {
  event.respondWith(router.fetch(event.request));
});
