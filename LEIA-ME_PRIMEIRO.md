# Site AMARO | PARACA — Origem do Pacote de Código-Fonte

> **Atualização local:** esta exportação foi convertida para Next.js padrão,
> executável em Node.js e preparada para o ICP. As instruções atuais estão em
> `README.md` e `DEPLOYMENT.md`. As observações abaixo registram o estado da
> exportação original do ChatGPT Sites.

> Exportação: 29 de julho de 2026
> Site: PARACA
> Versão do Sites: 3
> Commit de origem: `7122a49`
> Endereço publicado: <https://paraca-agencia.rafaelamaroumuarama.chatgpt.site>

## O que este pacote contém

Esta é uma cópia limpa do código-fonte que gera a versão 3 do site AMARO | PARACA.

Inclui:

- páginas e estilos;
- imagens usadas pelo site;
- favicon;
- testes;
- arquivos de build;
- contexto rápido do projeto;
- mockup do logotipo;
- guia de identidade visual.

Não inclui:

- `node_modules`;
- pasta `.git`;
- arquivos de build gerados;
- senhas, tokens ou chaves;
- histórico de versões do Sites.

## Requisitos

- Ubuntu ou outro Linux compatível;
- Node.js `22.13.0` ou superior;
- npm.

## Abrir no VS Code

No terminal, entre na pasta:

```bash
cd AMARO_PARACA_SITE_V3_2026-07-29
code .
```

## Instalar e executar localmente

```bash
npm ci
npm run dev
```

O terminal mostrará o endereço local para abrir no navegador.

## Validar o projeto

```bash
npm test
```

Na exportação de 29/07/2026, o build e o teste automatizado foram aprovados:

```text
testes: 1
aprovados: 1
falhas: 0
```

## Estrutura principal

```text
app/
├── page.tsx          página principal
├── globals.css       identidade visual e responsividade
├── layout.tsx        metadados e estrutura global
├── robots.ts         regras para mecanismos de busca
└── sitemap.ts        mapa do site

public/
├── assets/           imagens otimizadas
└── favicon.svg       ícone do navegador

docs/
├── CONTEXTO_RAPIDO_AMARO_PARACA.md
└── identidade/

tests/                teste automatizado
scripts/              instalação, build e validação
```

## Situação do GitHub

Na verificação realizada em 29/07/2026, não existia um repositório oficial:

```text
Rafadormi/amaro-paraca
```

O repositório `Rafadormi/amaro-workstation` é outro projeto e não deve receber este código por suposição.

Criar o repositório e enviar o código ao GitHub são ações externas. Devem ser feitos somente após autorização explícita de Rafael.

## Atenção antes de publicar no ICP

Esta versão foi construída para a infraestrutura do ChatGPT Sites usando Vinext e Cloudflare Worker.

Ela não deve ser enviada diretamente ao ICP como se já fosse uma aplicação Node.js comum. Antes da implantação na VPS, é necessário:

1. preservar esta exportação como referência;
2. criar uma versão de produção compatível com Node.js;
3. garantir que a aplicação escute a porta fornecida pelo ambiente, normalmente por `PORT`;
4. validar build, healthcheck, variáveis e logs;
5. criar o repositório privado oficial;
6. integrar GitHub → ICP;
7. testar antes de apontar `amaroparaca.com.br`;
8. ativar HTTPS pelo OpenResty do ICP.

Não instalar proxy concorrente e não fazer configurações via SSH sem orientação do suporte da Integrator.

## Identidade oficial

```text
AMARO | PARACA
Inteligência operacional e automação aplicada
```

- `PARACA` sem acento;
- não usar `Structure Everything.`;
- manter o visual em grafite, preto e acentos quentes;
- preservar o monograma e as proporções;
- tratar o mockup em relevo como imagem de apresentação, não como vetor mestre.
