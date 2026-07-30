import { validateLead } from "@/lib/leads";

export const runtime = "nodejs";

const maxRequestBytes = 16_384;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (!contentType.includes("application/json")) {
    return Response.json({ message: "Formato inválido." }, { status: 415 });
  }

  if (contentLength > maxRequestBytes) {
    return Response.json({ message: "Solicitação muito grande." }, { status: 413 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const validation = validateLead(input);
  if (!validation.ok) {
    return Response.json({ message: validation.message }, { status: 400 });
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (process.env.LEADS_ENABLED !== "true" || !webhookUrl) {
    return Response.json(
      {
        message:
          "A agenda de diagnósticos ainda está em ativação. Tente novamente em breve.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...validation.value, source: "amaroparaca.com.br" }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error("Lead delivery failed");
    }
  } catch {
    return Response.json(
      { message: "Não foi possível enviar agora. Tente novamente mais tarde." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
