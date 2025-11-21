"use client";

import { useState } from "react";
import Link from "next/link";

// Database 
import copyJSON from "@/app/database/copy.json";
import navJSON from "@/app/database/nav.json";
import contactJSON from "@/app/database/contact.json";
import { Locale, NavSection } from "./types";
import { IContactChannel, ICopy, INavigationItem, ISectionTitleProps, ISkillGroup } from "./interfaces";


const navSections = navJSON.navigation as INavigationItem[];

const copy: Record<Locale, ICopy> = copyJSON as Record<Locale, ICopy>;

const contactChannels: Record<Locale, IContactChannel[]> = contactJSON;

const languages: Locale[] = ["es", "en"];

const SectionTitle = ({ eyebrow, title, description }: ISectionTitleProps) => (
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
                <Link
                  key={section.id}
                  href={section.href}
                  className="rounded-full px-3 py-1 text-sm transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  {t.navLabels[section.id]}
                </Link>
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
