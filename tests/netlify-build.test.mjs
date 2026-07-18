import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the Netlify build contains both application routes", async () => {
  const manifestUrl = new URL(
    "../.next/server/app-paths-manifest.json",
    import.meta.url,
  );
  const routes = JSON.parse(await readFile(manifestUrl, "utf8"));

  assert.ok(routes["/page"], "the main experience route is missing");
  assert.ok(
    routes["/section-22-flow/page"],
    "the Section 22 flow route is missing",
  );
});
