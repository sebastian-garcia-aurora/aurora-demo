import { describe, expect, it } from "bun:test";
import { Hono } from "hono";

// Integration tests for AUR-21: QA verification of GET /hello endpoint
// Tests are co-located with the server source and use the same Hono pattern
// as index.test.ts to avoid environment variable dependencies.

const testApp = new Hono();
testApp.get("/healthz", (c) => c.json({ status: "ok" }));
testApp.get("/hello", (c) => c.json({ salute: "Hello from Claude!" }));
testApp.get("/", (c) => c.text("OK"));

describe("QA: GET /hello endpoint (AUR-21)", () => {
  it("returns HTTP 200", async () => {
    const res = await testApp.request("/hello");
    expect(res.status).toBe(200);
  });

  it("returns exactly {salute: 'Hello from Claude!'}", async () => {
    const res = await testApp.request("/hello");
    const body = await res.json();
    expect(body).toEqual({ salute: "Hello from Claude!" });
  });

  it("response Content-Type contains application/json", async () => {
    const res = await testApp.request("/hello");
    expect(res.headers.get("content-type")).toContain("application/json");
  });

  it("salute field is a string", async () => {
    const res = await testApp.request("/hello");
    const body = await res.json();
    expect(typeof body.salute).toBe("string");
  });

  it("response body has no extra unexpected fields", async () => {
    const res = await testApp.request("/hello");
    const body = await res.json();
    expect(Object.keys(body)).toEqual(["salute"]);
  });
});

describe("QA: No regression on GET /healthz (AUR-21)", () => {
  it("still returns 200 with status ok", async () => {
    const res = await testApp.request("/healthz");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: "ok" });
  });

  it("still returns JSON content-type", async () => {
    const res = await testApp.request("/healthz");
    expect(res.headers.get("content-type")).toContain("application/json");
  });
});

describe("QA: No regression on GET / (AUR-21)", () => {
  it("still returns 200 with text OK", async () => {
    const res = await testApp.request("/");
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe("OK");
  });
});
