import { Hono } from "hono";

import { sleep } from "./endpoints/sleep.js";
import { upload } from "./endpoints/upload.js";
import { echo, echoHeaders } from "./endpoints/echo.js";

const app = new Hono();

app.get("/", (c) => c.text("Hello, World!"));
app.get("/echo-headers", (c) => echoHeaders(c.req.raw));
app.get("/sleep/:ms", async (c) => await sleep(c.req.param("ms")));
app.post("/echo", (c) => echo(c.req.raw));
app.post("/upload", (c) => upload(c.req.raw));

addEventListener("fetch", (event) => {
  event.respondWith(app.fetch(event.request));
});
