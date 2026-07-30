export type Lead = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  challenge: string;
};

type ValidationResult =
  | { ok: true; value: Lead }
  | { ok: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateLead(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, message: "Dados do formulário inválidos." };
  }

  const data = input as Record<string, unknown>;

  if (text(data.website)) {
    return { ok: false, message: "Não foi possível enviar a solicitação." };
  }

  const lead: Lead = {
    name: text(data.name),
    company: text(data.company),
    whatsapp: text(data.whatsapp),
    email: text(data.email).toLowerCase(),
    challenge: text(data.challenge),
  };

  if (lead.name.length < 2 || lead.name.length > 80) {
    return { ok: false, message: "Informe seu nome." };
  }

  if (lead.company.length < 2 || lead.company.length > 120) {
    return { ok: false, message: "Informe o nome da empresa." };
  }

  const phoneDigits = lead.whatsapp.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    return { ok: false, message: "Informe um WhatsApp válido." };
  }

  if (!emailPattern.test(lead.email) || lead.email.length > 160) {
    return { ok: false, message: "Informe um e-mail válido." };
  }

  if (lead.challenge.length < 20 || lead.challenge.length > 1_000) {
    return {
      ok: false,
      message: "Descreva o principal atrito com pelo menos 20 caracteres.",
    };
  }

  return { ok: true, value: lead };
}
