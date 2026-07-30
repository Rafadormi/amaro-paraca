export const runtime = "nodejs";

export function GET() {
  return Response.json(
    { status: "ok", service: "amaro-paraca" },
    { headers: { "cache-control": "no-store" } },
  );
}
