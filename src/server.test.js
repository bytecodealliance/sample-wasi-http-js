import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { spawn } from "child_process";

import waitOn from 'wait-on';

const PORT = 8080;
const timeout = 30000;
const baseUrl = `http://localhost:${PORT}`;

describe("Integration tests for the WASI HTTP server endpoints", () => {
  let serverProcess;

  beforeAll(async () => {
    serverProcess = spawn(
      "wasmtime",
      ["serve", "-S", "common", "dist/server.component.wasm"],
      { stdio: "inherit" },
    );

    // Wait for the server to become available
    await waitOn({
      resources: [`tcp:localhost:${PORT}`],
      timeout,
      delay: 1000,
      interval: 500
    });
  }, timeout);

  afterAll(() => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  it('GET / should return "Hello, World!"', async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.status).toBe(200);

    const text = await res.text();
    expect(text).toBe("Hello, World!");
  });

  // Attempt to send a GET request with a body.
  it("POST /echo with body should echo the provided text", async () => {
    const testBody = "Test echo body";

    const req = new Request(`${baseUrl}/echo`, {
      method: "POST",
      body: testBody,
    });
    const res = await fetch(req);
    expect(res.status).toBe(200);

    const text = await res.text();
    expect(text).toBe(testBody);
  });

  it("GET /echo-headers should return the request headers in JSON", async () => {
    const res = await fetch(`${baseUrl}/echo-headers`, {
      headers: {
        "X-Test-Header": "123",
      },
    });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toMatchObject({
      "x-test-header": "123",
    });
  });

  it("GET /sleep/:ms should delay the response by at least the specified milliseconds", async () => {
    const sleepMs = 200;
    const start = Date.now();
    const res = await fetch(`${baseUrl}/sleep/${sleepMs}`);
    expect(res.status).toBe(200);

    const text = await res.text();
    const elapsed = Date.now() - start;

    expect(text).toBe(`Sleeping for ${sleepMs}ms...`);
    expect(elapsed).toBeGreaterThanOrEqual(sleepMs);
  });

  it("POST /upload with a valid file returns the file content", async () => {
    const content = "Hello World!";
    const blob = new Blob([content], { type: "text/plain" });

    const res = await fetch(`${baseUrl}/upload`, {
      method: "POST",
      body: blob,
    });

    expect(res.status).toBe(200);

    const text = await res.text();
    expect(text).toBe(content);
  });
});
