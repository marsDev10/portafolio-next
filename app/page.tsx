"use client";

import { useState } from "react";
import Link from "next/link";

type Locale = "es" | "en";

type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
};

type Project = {
  name: string;
  description: string;
  impact: string;
  stack: string[];
  linkLabel: string;
  href: string;
};

type HeroHighlight = {
  label: string;
  value: string;
};

type SectionTitleCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

type HeroCopy = {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  highlightTitle: string;
};

type Copy = {
  navLabels: Record<NavSection, string>;
  hero: HeroCopy;
  heroHighlights: HeroHighlight[];
  skillsSection: SectionTitleCopy;
  skillGroups: SkillGroup[];
  experienceSection: SectionTitleCopy;
  experiences: Experience[];
  projectsSection: SectionTitleCopy;
  projects: Project[];
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

type ContactChannel = {
  label: string;
  value: string;
  href: string;
};

const navSections = [
  { id: "hero", href: "#hero" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
] as const;

type NavSection = (typeof navSections)[number]["id"];

const copy: Record<Locale, Copy> = {
  es: {
    navLabels: {
      hero: "Portafolio",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      badge: "Mario Martinez - Full Stack Engineer",
      title: "Impulso plataformas CX con React, Node y datos accionables.",
      description:
        "Construyo productos B2B para empresas. Lidero el frontend de Xperience (CEM de Adryo) y colaboro con Dragoncem automatizando bots de WhatsApp con Twilio y APIs en Node TypeScript.",
      primaryCta: "Ver experiencia",
      secondaryCta: "Contactame",
      highlightTitle: "Logros",
    },
    heroHighlights: [
      { label: "Implementaciones B2B", value: "8+" },
      { label: "Bots y automatizaciones en Twilio", value: "12" },
      { label: "Tecnologias dominadas", value: "10" },
    ],
    skillsSection: {
      eyebrow: "Stack principal",
      title: "Tecnologias que uso cada dia",
      description:
        "React, Node, Go y datos empresariales para entregar experiencias consistentes a clientes finales.",
    },
    skillGroups: [
      {
        title: "Frontend & Mobile",
        description: "Experiencias consistentes para portales CX y apps internas.",
        items: ["React + TypeScript", "Next.js / Astro", "React Native", "Design Systems", "Testing UI"],
      },
      {
        title: "Backend & Data",
        description: "APIs y workflows en Node y Go con datos listos para negocio.",
        items: ["Node.js", "Go", "PHP / Python", "MySQL", "MongoDB"],
      },
      {
        title: "DevOps & Integraciones",
        description: "Automatizaciones que conectan herramientas y canales de soporte.",
        items: ["Docker", "CI/CD", "Twilio / WhatsApp", "REST / GraphQL", "Observabilidad"],
      },
    ],
    experienceSection: {
      eyebrow: "Experiencia profesional",
      title: "Resultados en CX y automatizacion",
      description:
        "Trabajo dentro de equipos de producto para mejorar soporte y fidelizacion sin vender servicios externos.",
    },
    experiences: [
      {
        company: "Dragoncem",
        role: "Full Stack Engineer",
        period: "2023 - Actualidad",
        summary:
          "Desarrollo bots de WhatsApp con Twilio y microservicios en Node/Go que conectan pedidos, soporte y reportes para distribuidores internacionales.",
        stack: ["Node.js", "Go", "Twilio", "Docker", "MySQL"],
      },
      {
        company: "Adryo - Xperience CEM",
        role: "Frontend & API Developer",
        period: "2021 - 2023",
        summary:
          "Disene el frontend completo del Customer Experience Management y cree rutas en Node TypeScript para recolectar feedback y visibilidad en tiempo real.",
        stack: ["React", "TypeScript", "Node.js", "MySQL", "Docker"],
      },
      {
        company: "Freelance & Startups",
        role: "Full Stack Developer",
        period: "2018 - 2021",
        summary:
          "Entregue MVPs web y mobile con React Native, Astro y PHP/Python para validar features rapidamente junto a equipos fundadores.",
        stack: ["React Native", "Astro", "PHP", "Python", "MongoDB"],
      },
    ],
    projectsSection: {
      eyebrow: "Casos destacados",
      title: "Impacto reciente",
      description: "Productos que respaldan unidades de negocio y clientes finales.",
    },
    projects: [
      {
        name: "Xperience CEM",
        description:
          "Portal de Customer Experience Management en Adryo con flujos de encuestas, tableros y seguimiento de clientes corporativos.",
        impact: "El frontend modular acelero lanzamientos de campanas CX en minutos.",
        stack: ["React", "TypeScript", "Node.js", "MySQL"],
        linkLabel: "Visitar plataforma",
        href: "https://xperience.adryo.com.mx",
      },
      {
        name: "Dragoncem CX Bots",
        description:
          "Suite de bots en WhatsApp y paneles internos que conectan Twilio con los sistemas comerciales de Dragoncem.",
        impact: "Automatiza la atencion inicial y enruta solicitudes en tiempo real para el equipo comercial.",
        stack: ["Node.js", "Go", "Twilio", "Docker"],
        linkLabel: "Sitio corporativo",
        href: "https://www.dragoncem.com/en-US/",
      },
      {
        name: "Twilio Service Apps",
        description:
          "Plantillas reutilizables para bots y microfrontends que conectan Twilio, React Native y APIs internas.",
        impact: "Reduce el tiempo de despliegue de nuevos flujos conversacionales a pocas horas.",
        stack: ["React Native", "Twilio", "TypeScript", "MongoDB"],
        linkLabel: "Ver referencia",
        href: "https://github.com/marsDev10",
      },
    ],
    contactSection: {
      eyebrow: "Contacto",
      title: "Listo para unirme a tu equipo",
      description:
        "Busco roles de tiempo completo enfocados en CX, automatizacion y productos digitales empresariales.",
    },
  },
  en: {
    navLabels: {
      hero: "Portfolio",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Mario Martinez - Full Stack Engineer",
      title: "I build CX platforms with React, Node, and actionable data.",
      description:
        "I focus on in-house product teams. I led the frontend for Xperience (Adryo's CEM) and support Dragoncem with Twilio WhatsApp bots plus Node TypeScript APIs.",
      primaryCta: "View experience",
      secondaryCta: "Get in touch",
      highlightTitle: "Highlights",
    },
    heroHighlights: [
      { label: "B2B launches", value: "8+" },
      { label: "Twilio automations", value: "12" },
      { label: "Core technologies", value: "10" },
    ],
    skillsSection: {
      eyebrow: "Core stack",
      title: "Tech I rely on every day",
      description:
        "React, Node, Go, Docker, and data stores that keep CX teams productive.",
    },
    skillGroups: [
      {
        title: "Frontend & Mobile",
        description: "Consistent experiences for CX portals and internal apps.",
        items: ["React + TypeScript", "Next.js / Astro", "React Native", "Design Systems", "UI Testing"],
      },
      {
        title: "Backend & Data",
        description: "APIs and workflows in Node and Go with business-ready data.",
        items: ["Node.js", "Go", "PHP / Python", "MySQL", "MongoDB"],
      },
      {
        title: "DevOps & Integrations",
        description: "Automations that connect support channels and internal tools.",
        items: ["Docker", "CI/CD", "Twilio / WhatsApp", "REST / GraphQL", "Observability"],
      },
    ],
    experienceSection: {
      eyebrow: "Professional experience",
      title: "Impact on CX and automation",
      description:
        "I partner with internal stakeholders to improve support and loyalty instead of selling services.",
    },
    experiences: [
      {
        company: "Dragoncem",
        role: "Full Stack Engineer",
        period: "2023 - Present",
        summary:
          "Build Twilio WhatsApp bots and Node/Go microservices that connect orders, support, and reporting for international distributors.",
        stack: ["Node.js", "Go", "Twilio", "Docker", "MySQL"],
      },
      {
        company: "Adryo - Xperience CEM",
        role: "Frontend & API Developer",
        period: "2021 - 2023",
        summary:
          "Designed the full React/TypeScript frontend and Node TypeScript routes powering the Customer Experience Management portal.",
        stack: ["React", "TypeScript", "Node.js", "MySQL", "Docker"],
      },
      {
        company: "Freelance & Startups",
        role: "Full Stack Developer",
        period: "2018 - 2021",
        summary:
          "Delivered web and mobile MVPs with React Native, Astro, and PHP/Python so founders could validate features quickly.",
        stack: ["React Native", "Astro", "PHP", "Python", "MongoDB"],
      },
    ],
    projectsSection: {
      eyebrow: "Case studies",
      title: "Recent impact",
      description: "Products that serve business units and their customers.",
    },
    projects: [
      {
        name: "Xperience CEM",
        description:
          "Customer Experience Management portal for Adryo with survey flows, dashboards, and enterprise account tracking.",
        impact: "The modular frontend lets CX campaigns launch in minutes.",
        stack: ["React", "TypeScript", "Node.js", "MySQL"],
        linkLabel: "Visit platform",
        href: "https://xperience.adryo.com.mx",
      },
      {
        name: "Dragoncem CX Bots",
        description:
          "WhatsApp bots and internal panes connecting Twilio to Dragoncem's commercial systems.",
        impact: "Automates intake and routes requests in real time for the sales team.",
        stack: ["Node.js", "Go", "Twilio", "Docker"],
        linkLabel: "Corporate site",
        href: "https://www.dragoncem.com/en-US/",
      },
      {
        name: "Twilio Service Apps",
        description:
          "Reusable bot templates and microfrontends connecting Twilio, React Native, and internal APIs.",
        impact: "Cuts deployment time for new conversational flows down to a few hours.",
        stack: ["React Native", "Twilio", "TypeScript", "MongoDB"],
        linkLabel: "See reference",
        href: "https://github.com/marsDev10",
      },
    ],
    contactSection: {
      eyebrow: "Contact",
      title: "Ready to join your team",
      description:
        "Looking for full-time roles focused on CX, automation, and enterprise digital products.",
    },
  },
};

const contactChannels: Record<Locale, ContactChannel[]> = {
  es: [
    { label: "Correo", value: "mariomars404@gmail.com", href: "mailto:mariomars404@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/marsdev", href: "https://www.linkedin.com/in/mario-mart%C3%ADnez-693389254" },
    { label: "GitHub", value: "github.com/marsdev", href: "https://github.com/marsdev" },
  ],
  en: [
    { label: "Email", value: "mariomars404@gmail.com", href: "mailto:mariomars404@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/marsdev", href: "https://www.linkedin.com/in/mario-mart%C3%ADnez-693389254" },
    { label: "GitHub", value: "github.com/marsDev10", href: "https://github.com/marsDev10" },
  ],
};

const languages: Locale[] = ["es", "en"];

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <header className="space-y-3">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
      {eyebrow}
    </p>
    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">{title}</h2>
    {description && (
      <p className="text-base text-zinc-600 dark:text-zinc-300">{description}</p>
    )}
  </header>
);

export default function Home() {
  const [locale, setLocale] = useState<Locale>("es");
  const t = copy[locale];
  const activeChannels = contactChannels[locale];

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 py-12 sm:py-16">
        <nav className="sticky top-4 z-10 flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.hero.badge}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-row sm:justify-end">
            <div className="flex flex-wrap gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-300">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  className="rounded-full px-3 py-1 text-sm transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  {t.navLabels[section.id]}
                </a>
              ))}
            </div>
            <div
              role="group"
              aria-label="Language toggle"
              className="flex items-center rounded-full border border-zinc-200 p-1 text-xs font-semibold dark:border-zinc-700"
            >
              {languages.map((lang) => {
                const isActive = lang === locale;
                return (
                  <button
                    key={lang}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setLocale(lang)}
                    className={`rounded-full px-3 py-1 transition ${
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <section id="hero" className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">{t.hero.badge}</p>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold text-zinc-950 dark:text-white sm:text-5xl">
                {t.hero.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">{t.hero.description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {t.hero.primaryCta}
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-semibold text-zinc-500">{t.hero.highlightTitle}</p>
            <div className="mt-6 space-y-6">
              {t.heroHighlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-dashed border-zinc-200 pb-4 last:border-none last:pb-0 dark:border-zinc-800"
                >
                  <p className="text-sm text-zinc-500">{item.label}</p>
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="space-y-10">
          <SectionTitle {...t.skillsSection} />
          <div className="grid gap-6 md:grid-cols-3">
            {t.skillGroups.map((skill) => (
              <article
                key={skill.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold">{skill.title}</h3>
                <p className="text-sm text-zinc-500">{skill.description}</p>
                <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-10">
          <SectionTitle {...t.experienceSection} />
          <div className="space-y-6">
            {t.experiences.map((exp) => (
              <article
                key={exp.company}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm text-zinc-500">{exp.company}</p>
                  </div>
                  <p className="text-sm font-medium text-zinc-500">{exp.period}</p>
                </div>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">{exp.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-10">
          <SectionTitle {...t.projectsSection} />
          <div className="grid gap-6 md:grid-cols-2">
            {t.projects.map((project) => (
              <article
                key={project.name}
                className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
                    SaaS
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{project.description}</p>
                <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">{project.impact}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500"
                >
                  {project.linkLabel}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-800 p-8 text-white shadow-xl dark:border-zinc-800"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                {t.contactSection.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold">{t.contactSection.title}</h2>
              <p className="text-sm text-zinc-200">{t.contactSection.description}</p>
            </div>
            <div className="space-y-4">
              {activeChannels.map((channel) => (
                <div key={channel.label} className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-zinc-400">
                    {channel.label}
                  </span>
                  <Link
                    rel="noopener"
                    target="_black"
                    href={channel.href}
                    className="text-lg font-semibold text-white hover:text-emerald-200"
                  >
                    {channel.value}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
