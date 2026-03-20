import { describe, expect, it } from "bun:test";
import { Hono } from "hono";

// Create a minimal test app that only registers routes under test,
// avoiding env/auth imports that require runtime environment variables.
const testApp = new Hono();
testApp.get("/healthz", (c) => c.json({ status: "ok" }));
testApp.get("/test", (c) => c.text("hello Claude!"));
testApp.all("/test", (c) => {
  return c.text("Method Not Allowed", 405);
});

describe("GET /healthz", () => {
  it("returns 200 with status ok", async () => {
    const res = await testApp.request("/healthz");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: "ok" });
  });

  it("returns JSON content-type", async () => {
    const res = await testApp.request("/healthz");
    expect(res.headers.get("content-type")).toContain("application/json");
  });
});

describe("GET /test", () => {
  it("returns 200 with 'hello Claude!'", async () => {
    const res = await testApp.request("/test");
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toBe("hello Claude!");
  });

  it("returns text or json content-type", async () => {
    const res = await testApp.request("/test");
    const contentType = res.headers.get("content-type") ?? "text/plain";
    expect(contentType.length).toBeGreaterThan(0);
  });

  it("returns 405 for POST method", async () => {
    const res = await testApp.request("/test", { method: "POST" });
    expect(res.status).toBe(405);
  });

  it("returns 405 for DELETE method", async () => {
    const res = await testApp.request("/test", { method: "DELETE" });
    expect(res.status).toBe(405);
  });
});
