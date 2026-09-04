import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the public website routes", async () => {
  const routes = [
    ["/", /Plan the Ultimate Florida Family Holiday/],
    ["/about", /Honest, Independent/],
    ["/contact", /Florida Questions/],
    ["/guide", /Featured Guides/],
    ["/guide/beat-the-florida-heat-with-young-kids", /Build your day around the coolest hours/],
  ];

  for (const [pathname, expectedContent] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should return HTTP 200`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, expectedContent);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
  }
});

test("contains the production worker, assets and project metadata", async () => {
  await Promise.all([
    access(new URL("../dist/server/index.js", import.meta.url)),
    access(new URL("../dist/server/wrangler.json", import.meta.url)),
    access(new URL("../dist/client/images/go-florida-logo.svg", import.meta.url)),
  ]);

  const [packageJson, readme, deployment] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../DEPLOYMENT.md", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "go-florida-guide"/);
  assert.match(packageJson, /"deploy:cloudflare"/);
  assert.match(readme, /^# Go Florida Guide/m);
  assert.match(deployment, /Cloudflare Workers/);
});
