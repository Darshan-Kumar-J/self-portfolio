import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Briefcase,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Moon,
  Phone,
  Search,
  Sun,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  ENGINEERING_PHILOSOPHY,
  EXPERIENCE,
  PORTFOLIO_PROFILE,
  PROJECTS,
} from '../data/portfolio';
import { TECHNICAL_STORIES } from '../data/stories';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { ContactForm } from '../components/ContactForm';
import { ProfilePortrait } from '../components/ProfilePortrait';
import { ProjectCard } from '../components/ProjectCard';
import { SkillsSection } from '../components/SkillsSection';
import { SpotlightCard } from '../components/SpotlightCard';
import { TechMarquee } from '../components/TechMarquee';
import { useTheme } from '../components/ThemeContext';
import { UniverseBackdrop } from '../components/UniverseBackdrop';

const PROJECT_CATEGORIES = ['All', 'Full-Stack', 'Enterprise', 'Healthcare', 'Research & Academic'] as const;

export function HomePage() {
  usePageMeta(
    'Darshan Kumar J — Python Full-Stack Developer',
    'Portfolio and engineering case studies of Darshan Kumar J, a Python Full-Stack Developer in Bengaluru building scalable web apps, APIs, and databases.',
  );

  const shouldReduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const [wordIndex, setWordIndex] = useState(0);
  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [techQuery, setTechQuery] = useState('');
  const [activeStorySlug, setActiveStorySlug] = useState(TECHNICAL_STORIES[0].slug);
  const [activePrincipleIdx, setActivePrincipleIdx] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % PORTFOLIO_PROFILE.heroAnimatedWords.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentWord = PORTFOLIO_PROFILE.heroAnimatedWords[wordIndex];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = projectCategory === 'All' || p.category === projectCategory;
    const q = techQuery.trim().toLowerCase();
    const matchesTech =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesTech;
  });

  const isDefaultProjectView = projectCategory === 'All' && !techQuery.trim();
  const activeStory =
    TECHNICAL_STORIES.find((s) => s.slug === activeStorySlug) ?? TECHNICAL_STORIES[0];
  const activePrinciple = ENGINEERING_PHILOSOPHY[activePrincipleIdx] ?? ENGINEERING_PHILOSOPHY[0];

  return (
    <div>
      {/* 1. HERO SECTION — THE ENGINEER'S DIGITAL UNIVERSE */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20">
        <UniverseBackdrop />

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Brand & Animated Headline */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-center lg:col-span-7"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#4E5565] dark:text-[#A0A5B1]">
                <span className="text-[#189C68] dark:text-[#35C58A] font-medium">
                  Available for engineering discussions
                </span>
                <span aria-hidden="true">·</span>
                <span>{PORTFOLIO_PROFILE.location}</span>
                <span aria-hidden="true">·</span>
                <span>{PORTFOLIO_PROFILE.currentRole}</span>
              </div>

              <p className="mt-6 font-display text-base sm:text-lg font-medium text-[#3458EB] dark:text-[#456DFF]">
                Hello, I&apos;m Darshan.
              </p>

              <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-balance text-[#111318] dark:text-[#F5F5F5]">
                Building the future, one{' '}
                <span className="inline-block min-w-[9ch] text-[#3458EB] dark:text-[#456DFF]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                      className="inline-block"
                    >
                      {currentWord}
                    </motion.span>
                  </AnimatePresence>
                </span>{' '}
                application at a time.
              </h1>

              <p className="mt-4 font-display text-lg sm:text-xl font-medium text-[#111318]/85 dark:text-[#F5F5F5]/90">
                {PORTFOLIO_PROFILE.name} — {PORTFOLIO_PROFILE.title}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {PORTFOLIO_PROFILE.heroSupport}
              </p>

              {/* Hero CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-5 py-3 text-sm font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-black/14 dark:border-white/14 bg-white dark:bg-[#20232B] px-5 py-3 text-sm font-medium text-[#111318] dark:text-[#F5F5F5] hover:border-[#456DFF]/50 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Let&apos;s Connect</span>
                </Link>

                <a
                  href="/api/resume.pdf"
                  download="Darshan_Kumar_J_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Theme Toggle & Quick Scroll */}
              <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-black/8 dark:border-white/8 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 font-medium hover:text-[#111318] dark:hover:text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#456DFF]" aria-hidden="true" />
                      <span>Switch to Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#3458EB]" aria-hidden="true" />
                      <span>Switch to Dark Theme</span>
                    </>
                  )}
                </button>
                <span aria-hidden="true">·</span>
                <a
                  href="#about"
                  className="inline-flex items-center gap-1.5 hover:text-[#111318] dark:hover:text-[#F5F5F5] transition-colors"
                >
                  <span>Scroll to explore</span>
                  <motion.span
                    animate={shouldReduceMotion ? undefined : { y: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="inline-flex"
                  >
                    <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                  </motion.span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Official Portrait + Interactive Code Lens */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="flex flex-col justify-center lg:col-span-5"
            >
              <ProfilePortrait variant="hero" priority />
            </motion.div>
          </div>

          {/* Full-width 4-Column Factual Snapshot Strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#191C24]/90 backdrop-blur-sm p-5 sm:grid-cols-4 sm:gap-6 sm:p-6">
            <div>
              <div className="font-display text-2xl font-bold tabular-nums text-[#111318] dark:text-[#F5F5F5]">
                3 Years
              </div>
              <div className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                Professional Experience
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#111318] dark:text-[#F5F5F5]">
                CirrusLabs.io
              </div>
              <div className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                Analyst · Oct 2023 – Present
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold tabular-nums text-[#111318] dark:text-[#F5F5F5]">
                6 Projects
              </div>
              <div className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                Full-Stack, Enterprise &amp; Academic
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold tabular-nums text-[#111318] dark:text-[#F5F5F5]">
                MCA · 8.35
              </div>
              <div className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                M S Ramaiah Institute of Technology
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL MARQUEE DIVIDER */}
      <TechMarquee />

      {/* 2. ABOUT ME & INTERACTIVE ENGINEERING PHILOSOPHY */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-5"
            >
              <ProfilePortrait
                variant="about"
                imageSrc={PORTFOLIO_PROFILE.aboutPortraitPath}
              />
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="lg:col-span-7"
            >
              <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                About Me
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
                More Than Just Writing Code.
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {PORTFOLIO_PROFILE.aboutIntro.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Interactive Engineering Philosophy Explorer */}
              <div className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/8 dark:border-white/8 pb-4">
                  <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                    How I Think as an Engineer.
                  </h3>
                  <span className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                    Select a principle
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {ENGINEERING_PHILOSOPHY.map((item, idx) => {
                    const active = idx === activePrincipleIdx;
                    return (
                      <button
                        key={item.index}
                        type="button"
                        onClick={() => setActivePrincipleIdx(idx)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#3458EB] dark:bg-[#456DFF] text-white'
                            : 'bg-[#ECEEF3] dark:bg-[#191C24] text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                        }`}
                      >
                        {item.index}. {item.title}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/60 dark:bg-[#141720] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {activePrinciple.title}
                    </span>
                    <Link
                      to={activePrinciple.proofSlug}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#3458EB] dark:text-[#456DFF] hover:underline"
                    >
                      <span>{activePrinciple.proofLabel}</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                    {activePrinciple.detail}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline"
                >
                  <span>Explore full journey &amp; philosophy</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL ARSENAL */}
      <SkillsSection />

      {/* 4. FEATURED PROJECTS — EDITORIAL BENTO GRID */}
      <section id="projects" className="py-20 border-t border-black/8 dark:border-white/8">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                Featured Projects
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
                Engineering Case Studies &amp; Builds
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                Full-stack commerce, an illustrative banking-context developer portal, clinic scheduling infrastructure, and academic research.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Open full project library</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Filter Bar + Technology Search */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1.5 rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-1.5"
            >
              {PROJECT_CATEGORIES.map((category) => {
                const active = projectCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setProjectCategory(category)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-white dark:bg-[#20232B] text-[#111318] dark:text-[#F5F5F5] shadow-sm'
                        : 'text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E5565] dark:text-[#A0A5B1]"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search projects by technology or keyword"
                placeholder="Search tech (e.g. FastAPI, SQLite)"
                value={techQuery}
                onChange={(e) => setTechQuery(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] pl-10 pr-4 py-2.5 text-xs text-[#111318] dark:text-[#F5F5F5] placeholder:text-[#4E5565]/70 dark:placeholder:text-[#A0A5B1]/70 focus:border-[#456DFF] focus:outline-none"
              />
            </div>
          </div>

          {/* Dynamic Bento Grid (Spotlights for 01 & 02 when unfiltered, standard grid when filtered) */}
          {filteredProjects.length > 0 ? (
            isDefaultProjectView ? (
              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                {filteredProjects.map((project, idx) => {
                  const isHeroBento = idx < 2;
                  return (
                    <div
                      key={project.slug}
                      className={isHeroBento ? 'lg:col-span-12' : 'lg:col-span-6'}
                    >
                      <ProjectCard project={project} featured={isHeroBento} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )
          ) : (
            <div className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-10 text-center">
              <p className="text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                No projects matched &ldquo;{techQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setProjectCategory('All');
                  setTechQuery('');
                }}
                className="mt-3 text-xs font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. BEHIND THE CODE — TECHNICAL STORYTELLING ENGINE */}
      <section id="stories" className="py-20 border-t border-black/8 dark:border-white/8 bg-[#ECEEF3]/40 dark:bg-[#191C24]/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                Behind the Code
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
                Interactive Engineering Case Studies
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                Every story dissects the problem, architectural constraints, security boundaries, and verified engineering decisions. Click Trace Flow to animate requests through the system.
              </p>
            </div>

            <Link
              to="/stories"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>All technical stories</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Selector List */}
            <div className="space-y-3 lg:col-span-5">
              {TECHNICAL_STORIES.map((story) => {
                const selected = story.slug === activeStory.slug;
                return (
                  <button
                    key={story.slug}
                    type="button"
                    onClick={() => setActiveStorySlug(story.slug)}
                    className={`w-full text-left rounded-2xl border p-5 transition-colors ${
                      selected
                        ? 'border-[#456DFF] bg-white dark:bg-[#20232B]'
                        : 'border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#191C24] hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                      <span className="text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                        {story.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{story.projectTitle}</span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {story.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                      {story.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Interactive Diagram & Story Summary */}
            <div className="space-y-5 lg:col-span-7">
              <ArchitectureDiagram
                title={activeStory.diagramTitle}
                label={activeStory.diagramLabel}
                nodesData={activeStory.nodes}
                edgesData={activeStory.edges}
              />

              <SpotlightCard className="p-6">
                <div className="font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                  {activeStory.category} · {activeStory.readFocus}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                  {activeStory.sections.solution}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/stories/${activeStory.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Read 10-Part Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to={`/projects/${activeStory.projectSlug}`}
                    className="text-xs font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]"
                  >
                    Inspect parent project
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCE, EDUCATION & CERTIFICATIONS */}
      <section id="experience" className="py-20 border-t border-black/8 dark:border-white/8">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                Career &amp; Credentials
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
                Experience That Shapes Engineering.
              </h2>
            </div>
            <Link
              to="/experience"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Full timeline &amp; credentials</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Experience Card */}
            <div className="lg:col-span-7">
              {EXPERIENCE.map((exp) => (
                <SpotlightCard key={exp.company} className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 dark:border-white/10 bg-[#ECEEF3] dark:bg-[#191C24] text-[#3458EB] dark:text-[#456DFF]">
                        <Briefcase className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                          {exp.role} · {exp.company}
                        </h3>
                        <p className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                    {exp.summary}
                  </p>

                  <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 border-t border-black/8 dark:border-white/8 pt-5 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                    {exp.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#456DFF] shrink-0" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              ))}
            </div>

            {/* Education & Certifications */}
            <div className="space-y-6 lg:col-span-5">
              <SpotlightCard className="p-6">
                <div className="flex items-center gap-2.5 font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  <GraduationCap className="w-4 h-4 text-[#3458EB] dark:text-[#456DFF]" aria-hidden="true" />
                  <span>Education</span>
                </div>
                <div className="mt-4 space-y-4 divide-y divide-black/6 dark:divide-white/6">
                  {EDUCATION.map((edu) => (
                    <div key={edu.degree} className="pt-4 first:pt-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#111318] dark:text-[#F5F5F5]">
                          {edu.degree}
                        </h3>
                        <span className="font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1] tabular-nums shrink-0">
                          {edu.period}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                        {edu.institution}
                      </p>
                      <p className="mt-1 font-mono text-xs text-[#189C68] dark:text-[#35C58A] tabular-nums">
                        {edu.score}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="flex items-center gap-2.5 font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  <Award className="w-4 h-4 text-[#7C3AED] dark:text-[#8B5CF6]" aria-hidden="true" />
                  <span>Certifications</span>
                </div>
                <div className="mt-4 space-y-4 divide-y divide-black/6 dark:divide-white/6">
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.title} className="pt-4 first:pt-0">
                      <h3 className="text-sm font-semibold text-[#111318] dark:text-[#F5F5F5]">
                        {cert.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-20 border-t border-black/8 dark:border-white/8 bg-[#ECEEF3]/40 dark:bg-[#191C24]/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                Get In Touch
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
                Have an Interesting Idea? Let&apos;s Build Something.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                I&apos;m always interested in connecting with people who are passionate about technology, engineering and building useful digital products.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <a
                  href={`mailto:${PORTFOLIO_PROFILE.email}`}
                  className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4 hover:border-[#456DFF]/50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#3458EB] dark:text-[#456DFF] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">Email</div>
                    <div className="font-medium text-[#111318] dark:text-[#F5F5F5]">
                      {PORTFOLIO_PROFILE.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${PORTFOLIO_PROFILE.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4 hover:border-[#456DFF]/50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#189C68] dark:text-[#35C58A] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">Phone</div>
                    <div className="font-medium tabular-nums text-[#111318] dark:text-[#F5F5F5]">
                      {PORTFOLIO_PROFILE.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4">
                  <MapPin className="w-4 h-4 text-[#7C3AED] dark:text-[#8B5CF6] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">Location</div>
                    <div className="font-medium text-[#111318] dark:text-[#F5F5F5]">
                      {PORTFOLIO_PROFILE.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
