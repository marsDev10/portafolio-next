"use client";

import { useEffect, useRef, useState } from "react";

// Database
import copyJSON from "@/app/database/copy.json";
import navJSON from "@/app/database/nav.json";
import contactJSON from "@/app/database/contact.json";

// Types and Interfaces
import { Locale } from "./types";
import {
  IContactChannel,
  ICopy,
  INavigationItem,
  ISectionTitleProps,
} from "./interfaces";
import { ButtonCV } from "./components/ButtonCV";
import { Link } from "lucide-react";
import { ThreeExample } from "./components/ThreeExample";
import ButtonMusic from "./components/ButtonMusic";

const navSections = navJSON.navigation as INavigationItem[];

const copy: Record<Locale, ICopy> = copyJSON as Record<Locale, ICopy>;
const contactChannels: Record<Locale, IContactChannel[]> = contactJSON;
const languages: Locale[] = ["es", "en"];

const SectionTitle = ({ eyebrow, title, description }: ISectionTitleProps) => (
  <header className="space-y-3">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
      {eyebrow}
    </p>
    <h2 className="text-2xl font-semibold text-zinc-50">{title}</h2>
    {description && (
      <p className="text-base text-zinc-400">{description}</p>
    )}
  </header>
);

export default function Home() {

  const mainRef = useRef<HTMLDivElement | null>(null);

  const threeElement = useRef(null);
  const [width, setWidth] = useState<number>(0);

  const [locale, setLocale] = useState<Locale>("es");
  const t = copy[locale];
  const activeChannels = contactChannels[locale];

  const handleToggoleLocale = () => {
    if (locale === "en") {
      setLocale("es");
      return;
    }
    setLocale("en");
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 100; // Offset para la navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!mainRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const widthWindow = entry.contentRect.width;
        setWidth(widthWindow);
        if(widthWindow < 768) {
          if(threeElement.current) {
            (threeElement.current as HTMLElement).style.display = "none";
          }
        } else {
          if(threeElement.current) {
            (threeElement.current as HTMLElement).style.display = "block";
          }
        }
        console.log("Width changed to:", widthWindow);
      }
    });

    resizeObserver.observe(mainRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
      <div 
      ref={mainRef}
      className="relative flex min-h-screen font-sans text-zinc-100 bg-transparent">
        
        <section 
        ref={threeElement}
        className="min-w-4/12 flex items-center sticky top-10 z-10 h-screen pr-10">
          <ThreeExample/>
        </section>
        <section className="">
          <div className="pointer-events-none absolute inset-x-0 top-40 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-emerald-500/25 blur-3xl" />
          <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 py-12 sm:py-16">
           
              {/* NAV */}
              <section className="sticky top-2 right-4 z-21 flex justify-end">
                <ButtonMusic />
              </section>
              <nav className="sticky top-12 z-20 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-lg shadow-black/40 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-zinc-100">
                  {t.hero.badge}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-row sm:justify-end">
                  <div className="flex flex-wrap gap-3 text-sm font-medium text-zinc-400">
                    {navSections.map((section) => (
                      <a
                        key={section.id}
                        href={section.href}
                        onClick={(e) => handleSmoothScroll(e, section.id)}
                        className="rounded-full px-3 py-1 text-sm transition hover:bg-zinc-700 hover:text-zinc-100"
                      >
                        {t.navLabels[section.id]}
                      </a>
                    ))}
                  </div>

                  {/* Toggle idioma (si lo quieres activar, ya está listo) */}
                  <div
                    role="group"
                    aria-label="Language toggle"
                    className="flex items-center rounded-full border border-zinc-700 bg-zinc-900/80 p-1 text-xs font-semibold"
                  >
                    {languages.map((lang) => {
                      const isActive = lang === locale;
                      return (
                        <button
                          key={lang}
                          type="button"
                          aria-pressed={isActive}
                          onClick={handleToggoleLocale}
                          className={`cursor-pointer rounded-full px-3 py-1 transition ${
                            isActive
                              ? "bg-zinc-50 text-zinc-900"
                              : "text-zinc-400 hover:text-zinc-100"
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* HERO */}
              <section id="hero" className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                    {t.hero.badge}
                  </p>
                  <div className="space-y-6">
                    <h1 className="text-4xl font-semibold text-zinc-50 sm:text-5xl">
                      {t.hero.title}
                    </h1>
                    <p className="text-lg text-zinc-400">{t.hero.description}</p>
                    {/* Debug: mostrar ancho actual */}
                    {/* <p className="text-sm text-emerald-400 font-mono">
                      Width: {width}px
                    </p> */}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#projects"
                      onClick={(e) => handleSmoothScroll(e, "projects")}
                      className="rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-zinc-900 transition-transform transition-shadow duration-150 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {t.hero.primaryCta}
                    </a>
                    <a
                      href="#contact"
                      onClick={(e) => handleSmoothScroll(e, "contact")}
                      className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors transition-transform duration-150 hover:-translate-y-0.5 hover:border-zinc-400"
                    >
                      {t.hero.secondaryCta}
                    </a>
                    <ButtonCV 
                    text={t.hero.threeCta}
                    locale={locale}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-lg shadow-black/40 backdrop-blur">
                  <p className="text-sm font-semibold text-zinc-400">
                    {t.hero.highlightTitle}
                  </p>
                  <div className="mt-6 space-y-6">
                    {t.heroHighlights.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between border-b border-dashed border-zinc-800 pb-4 last:border-none last:pb-0"
                      >
                        <p className="text-sm text-zinc-400">{item.label}</p>
                        <p className="text-2xl font-semibold text-zinc-50">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SKILLS */}
              <section id="skills" className="space-y-10">
                <SectionTitle {...t.skillsSection} />
                <div className="grid gap-6 md:grid-cols-3">
                  {t.skillGroups.map((skill) => (
                    <article
                      key={skill.title}
                      className="flex h-full flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 backdrop-blur transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <h3 className="text-lg font-semibold text-zinc-50">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{skill.description}</p>
                      <ul className="mt-2 space-y-1 text-sm text-zinc-300">
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

              {/* EXPERIENCE */}
              <section id="experience" className="space-y-10">
                <SectionTitle {...t.experienceSection} />
                <div className="space-y-6">
                  {t.experiences.map((exp) => (
                    <article
                      key={exp.company}
                      className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 backdrop-blur transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-50">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-zinc-400">{exp.company}</p>
                        </div>
                        <p className="text-sm font-medium text-zinc-500">
                          {exp.period}
                        </p>
                      </div>
                      <p className="mt-4 text-sm text-zinc-300">{exp.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section id="projects" className="space-y-10">
                <SectionTitle {...t.projectsSection} />
                <div className="grid gap-6 md:grid-cols-2">
                  {t.projects.map((project) => (
                    <article
                      key={project.name}
                      className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 backdrop-blur transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold text-zinc-50">
                          {project.name}
                        </h3>
                        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                          SaaS
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-zinc-300">
                        {project.description}
                      </p>
                      <p className="mt-2 text-sm font-medium text-zinc-200">
                        {project.impact}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                      >
                        {project.linkLabel}
                        <span aria-hidden>-&gt;</span>
                      </a>
                    </article>
                  ))}
                </div>
              </section>

              {/* CONTACT */}
              <section
                id="contact"
                className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-800 p-8 text-white shadow-xl shadow-black/50 backdrop-blur"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                      {t.contactSection.eyebrow}
                    </p>
                    <h2 className="text-3xl font-semibold">
                      {t.contactSection.title}
                    </h2>
                    <p className="text-sm text-zinc-200">
                      {t.contactSection.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {activeChannels.map((channel) => (
                      <div key={channel.label} className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-zinc-400">
                          {channel.label}
                        </span>
                        <a
                          rel="noopener"
                          target="_blank"
                          href={channel.href}
                          className="text-lg font-semibold text-white hover:text-emerald-200"
                        >
                          {channel.value}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
        </section>
      </div>
  );
}
