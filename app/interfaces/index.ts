import { NavSection } from "../types";

export interface ISkillGroup {
  title: string;
  description: string;
  items: string[];
};

export interface IExperience {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
};

export interface IProject {
  name: string;
  description: string;
  impact: string;
  stack: string[];
  linkLabel: string;
  href: string;
};

export interface IHeroHighlight {
  label: string;
  value: string;
};

export interface ISectionTitleCopy {
  eyebrow: string;
  title: string;
  description: string;
};

export interface IHeroCopy {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  highlightTitle: string;
};

export interface ICopy {
  navLabels: Record<NavSection, string>;
  hero: IHeroCopy;
  heroHighlights: IHeroHighlight[];
  skillsSection: ISectionTitleCopy;
  skillGroups: ISkillGroup[];
  experienceSection: ISectionTitleCopy;
  experiences: IExperience[];
  projectsSection: ISectionTitleCopy;
  projects: IProject[];
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export interface IContactChannel {
  label: string;
  value: string;
  href: string;
};


export interface ISectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
};

export interface INavigationItem {
    id: NavSection;
    href: string;
}