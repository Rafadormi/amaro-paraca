import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = 31_000 + Math.floor(Math.random() * 1_000);
const baseUrl = `http://127.0.0.1:${port}`;

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("The production server did not start in time.");
}

test("serves the production page and protected lead endpoint", async (t) => {
  const server = spawn(
    process.execPath,
    [join(root, "node_modules/next/dist/bin/next"), "start", "-p", `${port}`],
    {
      cwd: root,
      env: {
        ...process.env,
        LEADS_ENABLED: "false",
        NEXT_PUBLIC_LEADS_ENABLED: "false",
      },
      stdio: "ignore",
    },
  );

  t.after(() => server.kill("SIGTERM"));

  await waitForServer();

  const page = await fetch(baseUrl);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /Sua operação não precisa depender de improviso/i);

  const health = await fetch(`${baseUrl}/api/health`);
  assert.deepEqual(await health.json(), { status: "ok", service: "amaro-paraca" });

  const invalidLead = await fetch(`${baseUrl}/api/leads`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(invalidLead.status, 400);

  const inactiveLead = await fetch(`${baseUrl}/api/leads`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Rafael Amaro",
      company: "AMARO PARACA",
      whatsapp: "(44) 99999-9999",
      email: "rafael@example.com",
      challenge: "O atendimento manual consome tempo e faz oportunidades se perderem.",
      website: "",
    }),
  });
  assert.equal(inactiveLead.status, 503);
});
