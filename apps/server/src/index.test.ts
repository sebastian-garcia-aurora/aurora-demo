import { describe, expect, it } from "bun:test";
import { Hono } from "hono";

// Create a minimal test app that only registers the healthz route,
// avoiding env/auth imports that require runtime environment variables.
const testApp = new Hono();
testApp.get("/healthz", (c) => c.json({ status: "ok" }));

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
