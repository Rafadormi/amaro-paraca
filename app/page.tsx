"use client";

import { type FormEvent, useState } from "react";

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    className="arrow-icon"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d={diagonal ? "M6 18 18 6M8 6h10v10" : "M5 12h14M14 7l5 5-5 5"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const ServiceMark = ({ type }: { type: "presence" | "automation" | "agents" }) => {
  if (type === "presence") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="12" width="48" height="38" rx="3" />
        <path d="M8 21h48M15 17h.01M20 17h.01M25 17h.01M19 50v5M45 50v5M15 55h34" />
      </svg>
    );
  }

  if (type === "automation") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64" fill="none">
        <circle cx="18" cy="18" r="7" />
        <circle cx="46" cy="32" r="7" />
        <circle cx="18" cy="46" r="7" />
        <path d="M25 18h8a7 7 0 0 1 7 7M39 37a7 7 0 0 1-7 7h-7M18 25v14" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" fill="none">
      <path d="M20 14h24a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H31l-11 8v-8a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8Z" />
      <path d="M22 31h.01M32 31h.01M42 31h.01" />
    </svg>
  );
};

const ExternalArrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 18 18 6M8 6h10v10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const leadsEnabled = process.env.NEXT_PUBLIC_LEADS_ENABLED === "true";

type FormStatus =
  | { type: "idle"; message: string }
  | { type: "success" | "error"; message: string };

function DiagnosticForm() {
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  async function submitDiagnostic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!leadsEnabled) {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus({ type: "idle", message: "Enviando sua solicitação…" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          whatsapp: data.get("whatsapp"),
          email: data.get("email"),
          challenge: data.get("challenge"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Não foi possível enviar agora.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Recebemos sua solicitação. Em breve entraremos em contato.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar agora. Tente novamente mais tarde.",
      });
    }
  }

  return (
    <form className="diagnostic-form" onSubmit={submitDiagnostic}>
      <div className="form-grid">
        <label>
          Seu nome
          <input autoComplete="name" name="name" minLength={2} required />
        </label>
        <label>
          Empresa
          <input autoComplete="organization" name="company" minLength={2} required />
        </label>
        <label>
          WhatsApp
          <input
            autoComplete="tel"
            inputMode="tel"
            name="whatsapp"
            placeholder="(44) 99999-9999"
            required
          />
        </label>
        <label>
          E-mail
          <input autoComplete="email" name="email" type="email" required />
        </label>
      </div>
      <label>
        Qual atrito da sua operação você quer resolver?
        <textarea name="challenge" minLength={20} required rows={4} />
      </label>
      <label className="form-honeypot" aria-hidden="true">
        Website
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <button className="button button-primary" disabled={!leadsEnabled} type="submit">
        Solicitar diagnóstico <Arrow />
      </button>
      {leadsEnabled ? (
        <p className={`form-status ${status.type}`} aria-live="polite">
          {status.message}
        </p>
      ) : (
        <p className="form-note">
          A agenda de diagnósticos será ativada junto com o e-mail profissional.
        </p>
      )}
    </form>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="AMARO PARACA — início">
            <span>AMARO</span>
            <i aria-hidden="true" />
            <span>PARACA</span>
          </a>

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            <span />
            <span />
          </button>

          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            <a href="#solucoes" onClick={closeMenu}>
              Soluções
            </a>
            <a href="#metodo" onClick={closeMenu}>
              Como trabalhamos
            </a>
            <a href="#projetos" onClick={closeMenu}>
              Projetos
            </a>
            <a href="#sobre" onClick={closeMenu}>
              Sobre
            </a>
          </nav>

          <a className="header-cta" href="#contato" aria-label="Falar com a PARACA">
            <Arrow />
          </a>
        </header>

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Diagnóstico operacional para empresas em movimento</p>
            <h1>
              Sua operação não precisa depender de improviso. <span>Ela pode fluir.</span>
            </h1>
            <p className="hero-description">
              Identificamos onde o atendimento, os dados e as rotinas travam para
              transformar esforço disperso em uma operação mais clara e previsível.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contato">
                Solicitar diagnóstico <Arrow />
              </a>
              <a className="button button-secondary" href="#metodo">
                Entender o método <Arrow />
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand-relief.webp"
              alt=""
              width="1672"
              height="941"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="project-rail" id="projetos">
          <div className="rail-label">
            <span className="status-dot" />
            Projetos em campo
          </div>
          <a
            href="https://soberano-turismo.rafaelamaroumuarama.chatgpt.site/#inicio"
            target="_blank"
            rel="noreferrer"
          >
            Soberano Turismo <Arrow diagonal />
          </a>
          <a
            href="https://vidracaria-lideranca-umuarama.rafaelamaroumuarama.chatgpt.site/"
            target="_blank"
            rel="noreferrer"
          >
            Vidraçaria Liderança <Arrow diagonal />
          </a>
        </div>
      </section>

      <section className="opening" aria-label="Posicionamento">
        <p className="section-kicker">Da informação à ação</p>
        <h2>
          A empresa cresce quando o trabalho deixa de depender de memória,
          urgência e improviso. <span>É aí que a PARACA entra.</span>
        </h2>
        <div className="opening-note">
          <span>01</span>
          <p>
            O diagnóstico começa pela rotina real da empresa. Só então definimos
            o que deve ser organizado, automatizado ou apresentado melhor.
          </p>
        </div>
      </section>

      <section className="services" id="solucoes">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Soluções integradas</p>
            <h2>Uma operação mais clara começa com a pergunta certa.</h2>
          </div>
          <p>
            Em vez de empilhar ferramentas, conectamos presença, atendimento,
            dados e automação de acordo com a prioridade do negócio.
          </p>
        </div>

        <div className="service-grid">
          <article className="service-card">
            <div className="card-top">
              <span>01</span>
              <ServiceMark type="presence" />
            </div>
            <h3>Presença digital</h3>
            <p>
              Sites e landing pages com estratégia, narrativa clara, SEO e
              jornadas pensadas para transformar atenção em contato.
            </p>
            <ul>
              <li>Sites institucionais</li>
              <li>Landing pages</li>
              <li>Portfólios e catálogos</li>
            </ul>
          </article>

          <article className="service-card is-featured">
            <div className="card-top">
              <span>02</span>
              <ServiceMark type="automation" />
            </div>
            <h3>Automação aplicada</h3>
            <p>
              Fluxos que conectam formulários, WhatsApp, agendas e sistemas para
              reduzir retrabalho e evitar que oportunidades se percam.
            </p>
            <ul>
              <li>Integrações e rotinas</li>
              <li>Qualificação de contatos</li>
              <li>Alertas e acompanhamentos</li>
            </ul>
          </article>

          <article className="service-card">
            <div className="card-top">
              <span>03</span>
              <ServiceMark type="agents" />
            </div>
            <h3>Agentes de IA</h3>
            <p>
              Atendimento orientado por contexto, com base de conhecimento,
              execução de tarefas e encaminhamento humano na hora certa.
            </p>
            <ul>
              <li>Atendimento inteligente</li>
              <li>Assistentes internos</li>
              <li>Conhecimento organizado</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="method" id="metodo">
        <div className="method-intro">
          <p className="section-kicker">Método MODUS</p>
          <h2>Antes da ferramenta, vem o entendimento.</h2>
          <p>
            Não começamos escolhendo uma tecnologia. Primeiro entendemos onde o
            trabalho trava, o que precisa ser medido e qual resultado deve
            aparecer na operação.
          </p>
        </div>

        <div className="method-flow">
          {[
            ["01", "Dado", "O que existe e o que ainda precisa ser coletado."],
            ["02", "Informação", "Contexto para entender o que está acontecendo."],
            ["03", "Decisão", "Critérios claros para escolher o próximo movimento."],
            ["04", "Ação", "Automação, site ou agente executando o que foi definido."],
            ["05", "Acompanhamento", "Medição, aprendizado e evolução contínua."],
          ].map(([number, title, description]) => (
            <article className="method-step" key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cases" id="casos">
        <div className="section-heading cases-heading">
          <div>
            <p className="section-kicker">Projetos em campo</p>
            <h2>Estratégia que vira resultado na rotina.</h2>
          </div>
          <p>
            Cada projeto parte de um problema real e entrega uma estrutura que
            ajuda a atender, organizar e avançar com mais confiança.
          </p>
        </div>

        <div className="case-list">
          <article className="case-card case-soberano">
            <div className="case-visual">
              <div className="case-browser">
                <div className="case-browser-bar" aria-hidden="true">
                  <div className="case-browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="case-browser-url">soberano-turismo</span>
                  <span className="case-index">01 / 02</span>
                </div>
                <div className="case-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/cases/soberano-turismo.webp"
                    alt="Van da frota Soberano Turismo apresentada no projeto"
                    width="1600"
                    height="1000"
                    loading="lazy"
                  />
                  <span className="case-status">
                    <i aria-hidden="true" />
                    Projeto publicado
                  </span>
                  <div className="case-visual-copy">
                    <p>Transporte executivo</p>
                    <strong>Soberano Turismo</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-content">
              <p className="case-type">
                Website · Assistente de orçamento · Estratégia
              </p>
              <h3>Soberano Turismo</h3>
              <p>
                Site premium com apresentação da frota, provas de segurança e
                um assistente que coleta origem, destino, datas e passageiros
                antes de encaminhar a solicitação para a equipe.
              </p>
              <ul className="case-deliverables">
                <li>Site institucional responsivo</li>
                <li>Assistente de triagem para orçamento</li>
                <li>Galeria da frota, segurança e FAQ</li>
              </ul>
              <a
                href="https://soberano-turismo.rafaelamaroumuarama.chatgpt.site/#inicio"
                target="_blank"
                rel="noreferrer"
              >
                Abrir o site publicado <ExternalArrow />
              </a>
            </div>
          </article>

          <article className="case-card case-lideranca">
            <div className="case-visual">
              <div className="case-browser">
                <div className="case-browser-bar" aria-hidden="true">
                  <div className="case-browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="case-browser-url">vidracaria-lideranca</span>
                  <span className="case-index">02 / 02</span>
                </div>
                <div className="case-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/cases/vidracaria-lideranca.webp"
                    alt="Obra real de esquadria da Vidraçaria Liderança"
                    width="1600"
                    height="900"
                    loading="lazy"
                  />
                  <span className="case-status">
                    <i aria-hidden="true" />
                    Projeto publicado
                  </span>
                  <div className="case-visual-copy">
                    <p>Vidros e esquadrias</p>
                    <strong>Vidraçaria Liderança</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-content">
              <p className="case-type">
                Website multipágina · Catálogo · Portfólio
              </p>
              <h3>Vidraçaria Liderança</h3>
              <p>
                Presença digital orientada a serviços e confiança regional, com
                páginas específicas, catálogo visual de soluções, obras reais
                e caminhos diretos para solicitar orçamento.
              </p>
              <ul className="case-deliverables">
                <li>Estrutura multipágina de serviços</li>
                <li>Catálogo e portfólio de obras</li>
                <li>SEO local e contato pelo WhatsApp</li>
              </ul>
              <a
                href="https://vidracaria-lideranca-umuarama.rafaelamaroumuarama.chatgpt.site/"
                target="_blank"
                rel="noreferrer"
              >
                Abrir o site publicado <ExternalArrow />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="about" id="sobre">
        <div className="about-grid">
          <div className="about-title">
            <p className="section-kicker">AMARO | PARACA</p>
            <h2>Experiência operacional colocada para trabalhar a favor do negócio.</h2>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              A PARACA transforma problemas repetidos em decisões mais claras,
              rotinas melhores e presença digital que apoia o crescimento.
            </p>
            <p>
              Criada por Rafael Amaro Silvério em Umuarama, Paraná, une vivência
              operacional e gerencial a desenvolvimento, estratégia de dados,
              automação e inteligência artificial.
            </p>
            <p>
              <strong>AMARO</strong> representa origem e legado.{" "}
              <strong>PARACA</strong> representa a estrutura que aproxima
              estratégia e execução: trazer o problema para cá, organizar e
              fazer acontecer.
            </p>
          </div>
        </div>
        <div className="about-principles">
          <span>Clareza antes da complexidade</span>
          <span>Automação com propósito</span>
          <span>Tecnologia com supervisão humana</span>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="faq-heading">
          <p className="section-kicker">Perguntas frequentes</p>
          <h2>Antes de começar.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>
              A PARACA atende apenas empresas de Umuarama?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              Não. A proximidade regional facilita o entendimento do negócio,
              mas os diagnósticos, sites, automações e agentes podem ser
              desenvolvidos e acompanhados de forma remota.
            </p>
          </details>
          <details>
            <summary>
              Preciso contratar site, automação e IA juntos?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              Não. O projeto começa pela prioridade atual do negócio. A estrutura
              é modular e pode evoluir por etapas, sem contratar ferramentas que
              ainda não fazem sentido.
            </p>
          </details>
          <details>
            <summary>
              O atendimento automatizado substitui minha equipe?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              A proposta é reduzir tarefas repetitivas, organizar informações e
              preparar o atendimento. Situações comerciais, sensíveis ou fora
              do fluxo são encaminhadas para uma pessoa.
            </p>
          </details>
          <details>
            <summary>
              Como é definido o investimento?
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              Depois de entender o objetivo, os canais envolvidos e a
              complexidade operacional, a PARACA apresenta um escopo por etapas,
              com entregas e responsabilidades claras.
            </p>
          </details>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="section-kicker">Diagnóstico operacional</p>
        <h2>Vamos descobrir o que está travando sua operação?</h2>
        <p className="contact-copy">
          Conte o que mais consome tempo, gera retrabalho ou impede sua empresa
          de atender melhor. A primeira conversa serve para organizar a prioridade.
        </p>
        <DiagnosticForm />
        <div className="contact-meta">
          <span>Umuarama · Paraná · Brasil</span>
          <span>Diagnósticos por prioridade</span>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <span>AMARO</span>
          <i aria-hidden="true" />
          <span>PARACA</span>
        </a>
        <p>Clareza operacional para empresas em movimento.</p>
        <div>
          <a href="#solucoes">Soluções</a>
          <a href="#casos">Projetos</a>
          <a href="#faq">FAQ</a>
          <a href="#contato">Diagnóstico</a>
        </div>
        <small>© 2026 AMARO | PARACA</small>
      </footer>
    </main>
  );
}
