# Publicação no ICP e DNS no Registro.br

## Antes de publicar

1. Abra um ticket para a Integrator confirmar o fluxo nativo do ICP para uma
   aplicação Docker/Node.js, a URL temporária e o procedimento de rollback.
2. Crie o repositório privado `Rafadormi/amaro-paraca` no GitHub e conecte-o ao
   ICP com uma credencial de leitura de escopo mínimo.
3. Configure a aplicação com Node.js 22, `npm ci`, `npm run build` e
   `npm run start`. O build já inclui os arquivos estáticos necessários para
   o modo standalone. Use o `Dockerfile` somente quando o painel oferecer build por
   contêiner.
4. Defina uma porta interna atribuída pelo ICP. A aplicação usa `PORT` e expõe
   o healthcheck `GET /api/health`.

## Ambiente de teste

1. Publique primeiro na URL temporária fornecida pelo ICP.
2. Confira `GET /api/health`, logs, versão mobile e desktop, links, formulário
   bloqueado sem entrega configurada e certificado HTTPS da URL de teste.
3. Registre como reverter para a versão anterior antes de qualquer DNS.

## Produção no Registro.br

Somente depois da validação do ambiente de teste:

1. Confirme no painel ICP o IPv4 público atual da VPS.
2. No Registro.br, crie/atualize `A` para `@` apontando ao IPv4 confirmado e
   outro `A` para `www` apontando ao mesmo IPv4. Use TTL de 300 segundos na
   primeira ativação.
3. No ICP, adicione `amaroparaca.com.br` como domínio principal e configure
   o redirecionamento `www.amaroparaca.com.br` para o domínio sem `www`.
4. Emita e valide o certificado HTTPS pelas ferramentas nativas do ICP.
5. Verifique DNS, HTTPS, redirecionamento, logs e healthcheck antes de anunciar
   o endereço.

Não adicione MX, SPF, DKIM ou DMARC nesta etapa: eles pertencem à implantação
posterior do e-mail profissional. Preserve todos os registros DNS existentes.

## Formulário de diagnóstico

O formulário fica inativo até existir um destino confiável para os contatos.
Quando o e-mail profissional e o serviço de entrega forem aprovados, configure
as variáveis descritas em `.env.example` no painel ICP, sem colocá-las no GitHub.
