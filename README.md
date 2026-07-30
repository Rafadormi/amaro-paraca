# AMARO | PARACA

Site institucional da AMARO | PARACA, com foco em diagnóstico operacional,
presença digital, automação e agentes de IA para empresas locais.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

```bash
npm run lint
npm test
```

## Formulário de diagnóstico

O formulário só envia dados quando estas variáveis estiverem configuradas no
ambiente de produção:

```text
NEXT_PUBLIC_LEADS_ENABLED=true
LEADS_ENABLED=true
LEADS_WEBHOOK_URL=https://servico-autorizado.example/leads
```

Sem essas variáveis, o site continua público, mas o botão fica bloqueado para
evitar a perda de solicitações. Nunca versione arquivos `.env` ou chaves de
serviços.

## Produção no ICP

O projeto gera uma aplicação Next.js standalone para Node.js 22 e inclui um
`Dockerfile` com healthcheck em `/api/health`. Use o OpenResty e as ferramentas
nativas do painel ICP para proxy, HTTPS e domínios; não instale proxy concorrente.

O procedimento de publicação e DNS está em [DEPLOYMENT.md](DEPLOYMENT.md).
