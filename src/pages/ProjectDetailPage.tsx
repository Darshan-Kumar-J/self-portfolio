import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Maximize2,
  X,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { TECHNICAL_STORIES } from '../data/stories';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = projectIndex >= 0 ? PROJECTS[projectIndex] : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expandedStoryIdx, setExpandedStoryIdx] = useState<number | null>(0);

  usePageMeta(
    project ? `${project.title} — Case Study | Darshan Kumar J` : 'Project Not Found',
    project ? project.summary : 'Requested project case study could not be found.',
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!project) {
    return (
      <div className="py-24 text-center px-5">
        <h1 className="font-display text-3xl font-bold text-[#111318] dark:text-[#F5F5F5]">
          Project Not Found
        </h1>
        <p className="mt-3 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
          The requested case study does not exist.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2 text-sm font-medium text-white"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;
  const linkedStories = TECHNICAL_STORIES.filter((s) => project.storySlugs.includes(s.slug));
  const primaryDiagramStory = linkedStories[0];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>All Projects</span>
        </Link>

        {/* Header */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
              <span className="text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                Project {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.classification}</span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
              {project.title}
            </h1>
            <p className="mt-2 font-display text-lg text-[#4E5565] dark:text-[#A0A5B1]">
              {project.subtitle}
            </p>
            <p className="mt-5 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
              {project.summary}
            </p>

            {project.disclaimer && (
              <div className="mt-5 rounded-xl border border-[#7C3AED]/30 bg-[#7C3AED]/8 p-4 text-xs leading-relaxed text-[#111318] dark:text-[#F5F5F5]">
                {project.disclaimer}
              </div>
            )}

            {project.academicNote && (
              <div className="mt-5 rounded-xl border border-black/10 dark:border-white/10 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-4 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {project.academicNote}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] transition-colors"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-black/12 dark:border-white/12 bg-white dark:bg-[#20232B] px-4 py-2.5 text-sm font-medium text-[#111318] dark:text-[#F5F5F5]"
              >
                <span>Discuss This Project</span>
              </Link>
            </div>
          </div>

          {/* Clickable Gallery Visual */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Inspect ${project.title} full visual`}
              className="group relative block w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#ECEEF3] dark:bg-[#191C24] text-left"
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                width={800}
                height={600}
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg bg-[#101114]/80 px-2.5 py-1.5 font-mono text-[11px] text-white">
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inspect</span>
              </span>
            </button>

            <div className="mt-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4">
              <div className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                Technology Stack
              </div>
              <p className="mt-1.5 text-sm font-medium text-[#111318] dark:text-[#F5F5F5]">
                {project.techStack.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Contributions */}
        <section className="mt-16 pt-12 border-t border-black/8 dark:border-white/8">
          <h2 className="font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
            Verified Technical Contributions
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {project.contributions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4 text-sm text-[#4E5565] dark:text-[#A0A5B1]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#456DFF] shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Research Sections for Accident Severity Intelligence System */}
        {project.researchSections && (
          <section className="mt-16 pt-12 border-t border-black/8 dark:border-white/8 space-y-8">
            <h2 className="font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
              Research Breakdown
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
                <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  Problem Statement
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                  {project.researchSections.problemStatement}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
                <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  Data Analysis Approach
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                  {project.researchSections.dataAnalysisApproach}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
                <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  Association Rule Mining
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                  {project.researchSections.associationRulesExplanation}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
                <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  Research Objectives
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                  {project.researchSections.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#456DFF] shrink-0" aria-hidden="true" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
                <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  Key Concepts
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                  {project.researchSections.keyConcepts.map((concept) => (
                    <li key={concept} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shrink-0" aria-hidden="true" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Architecture Diagram & Technical Stories */}
        {primaryDiagramStory && (
          <section className="mt-16 pt-12 border-t border-black/8 dark:border-white/8 space-y-6">
            <div>
              <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                Architecture &amp; Engineering Stories
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                System Topology &amp; Technical Breakdown
              </h2>
            </div>

            <ArchitectureDiagram
              title={primaryDiagramStory.diagramTitle}
              label={primaryDiagramStory.diagramLabel}
              nodesData={primaryDiagramStory.nodes}
              edgesData={primaryDiagramStory.edges}
            />

            {project.storyTitles.length > 0 && (
              <div className="space-y-3">
                {project.storyTitles.map((title, idx) => {
                  const open = expandedStoryIdx === idx;
                  const targetStory = linkedStories[idx % linkedStories.length];
                  return (
                    <div
                      key={title}
                      className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B]"
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setExpandedStoryIdx(open ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-display text-sm sm:text-base font-medium text-[#111318] dark:text-[#F5F5F5]">
                          {title}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-[#4E5565] dark:text-[#A0A5B1] transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {open && targetStory && (
                        <div className="border-t border-black/6 dark:border-white/6 px-5 py-4 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                          <p>{targetStory.sections.challenge}</p>
                          <Link
                            to={`/stories/${targetStory.slug}`}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline"
                          >
                            <span>Open full 10-part engineering story</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Previous / Next Navigation */}
        <nav
          aria-label="Project navigation"
          className="mt-16 pt-8 border-t border-black/8 dark:border-white/8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-left"
            >
              <ArrowLeft className="w-4 h-4 text-[#4E5565] group-hover:text-[#456DFF]" aria-hidden="true" />
              <div>
                <div className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                  Previous Project
                </div>
                <div className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5] group-hover:text-[#456DFF]">
                  {prevProject.title}
                </div>
              </div>
            </Link>
          ) : (
            <span />
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-3 text-right"
            >
              <div>
                <div className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                  Next Project
                </div>
                <div className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5] group-hover:text-[#456DFF]">
                  {nextProject.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#4E5565] group-hover:text-[#456DFF]" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} visual lightbox`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#101114]/92 p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl border border-white/15 bg-[#191C24]"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-[#101114]/80 text-white hover:bg-[#101114]"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-full object-contain bg-[#101114]"
            />
            <div className="border-t border-white/10 px-5 py-3.5 text-xs text-[#A0A5B1]">
              <span className="font-medium text-[#F5F5F5]">{project.title}</span> — {project.imageAlt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
