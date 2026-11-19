import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react';
import { TECHNICAL_STORIES } from '../data/stories';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export function StoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const storyIndex = TECHNICAL_STORIES.findIndex((s) => s.slug === slug);
  const story = storyIndex >= 0 ? TECHNICAL_STORIES[storyIndex] : undefined;

  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [copied, setCopied] = useState(false);

  usePageMeta(
    story ? `${story.title} — Behind the Code | Darshan Kumar J` : 'Story Not Found',
    story ? story.subtitle : 'Requested engineering story could not be found.',
  );

  if (!story) {
    return (
      <div className="py-24 text-center px-5">
        <h1 className="font-display text-3xl font-bold text-[#111318] dark:text-[#F5F5F5]">
          Technical Story Not Found
        </h1>
        <Link
          to="/stories"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2 text-sm font-medium text-white"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Stories</span>
        </Link>
      </div>
    );
  }

  const prevStory = storyIndex > 0 ? TECHNICAL_STORIES[storyIndex - 1] : null;
  const nextStory =
    storyIndex < TECHNICAL_STORIES.length - 1 ? TECHNICAL_STORIES[storyIndex + 1] : null;

  const activeSnippet = story.sections.codeTabs[activeCodeTab] ?? story.sections.codeTabs[0];

  const handleCopyCode = async () => {
    if (!activeSnippet) return;
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All Technical Stories</span>
          </Link>

          <Link
            to={`/projects/${story.projectSlug}`}
            className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] hover:underline"
          >
            Parent Project: {story.projectTitle}
          </Link>
        </div>

        {/* Title Header */}
        <header className="mt-8 border-b border-black/8 dark:border-white/8 pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
            <span className="text-[#3458EB] dark:text-[#456DFF] tabular-nums">
              Case Study {story.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{story.category}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readFocus}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
            {story.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
            {story.subtitle}
          </p>
        </header>

        {/* 10-Part Engineering Breakdown */}
        <div className="mt-10 space-y-12">
          {/* 1 - 4 Narrative */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                01. The Problem
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.problem}
              </p>
            </section>

            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                02. The Challenge
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.challenge}
              </p>
            </section>

            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                03. The Investigation
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.investigation}
              </p>
            </section>

            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#189C68] dark:text-[#35C58A] tabular-nums">
                04. The Solution
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.solution}
              </p>
            </section>
          </div>

          {/* 5. Technical Architecture */}
          <section className="space-y-5">
            <div>
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                05. Technical Architecture
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                System Layers &amp; Interactive Flow
              </h2>
            </div>

            <ArchitectureDiagram
              title={story.diagramTitle}
              label={story.diagramLabel}
              nodesData={story.nodes}
              edgesData={story.edges}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['Frontend', story.sections.architecture.frontend],
                ['Backend', story.sections.architecture.backend],
                ['APIs', story.sections.architecture.apis],
                ['Database', story.sections.architecture.database],
                ['Integrations', story.sections.architecture.integrations],
              ].map(([layer, desc]) => (
                <div
                  key={layer}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4"
                >
                  <div className="font-mono text-xs font-medium text-[#111318] dark:text-[#F5F5F5]">
                    {layer}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Implementation */}
          <section className="space-y-4">
            <div>
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                06. Implementation
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                Illustrative Code &amp; Schema Patterns
              </h2>
              <p className="mt-1.5 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.implementationSummary}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#141720] text-[#F5F5F5]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {story.sections.codeTabs.map((tab, idx) => (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveCodeTab(idx)}
                      className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                        activeCodeTab === idx
                          ? 'bg-[#456DFF] text-white'
                          : 'text-[#A0A5B1] hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/12 px-2.5 py-1 font-mono text-[11px] text-[#A0A5B1] hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#35C58A]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {activeSnippet && (
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-[#E2E6F0]">
                  <code>{activeSnippet.code}</code>
                </pre>
              )}
            </div>
          </section>

          {/* 7 & 8 Engineering Decisions & Security */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                07. Engineering Decisions
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.engineeringDecisions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#456DFF] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#7C3AED] dark:text-[#8B5CF6] tabular-nums">
                08. Security Considerations
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.securityConsiderations.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 9 & 10 Outcome & Lessons Learned */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#189C68] dark:text-[#35C58A] tabular-nums">
                09. Outcome
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.outcome}
              </p>
            </section>

            <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                10. Lessons Learned
              </div>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.lessonsLearned.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#35C58A] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Transparent Note / Placeholder */}
          <div className="rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-4 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
            {story.sections.openDetailsPrompt}
          </div>
        </div>

        {/* Previous / Next Story Navigation */}
        <nav
          aria-label="Technical story navigation"
          className="mt-14 pt-8 border-t border-black/8 dark:border-white/8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {prevStory ? (
            <Link to={`/stories/${prevStory.slug}`} className="group flex items-center gap-3">
              <ArrowLeft className="w-4 h-4 text-[#4E5565] group-hover:text-[#456DFF]" aria-hidden="true" />
              <div>
                <div className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                  Previous Story
                </div>
                <div className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5] group-hover:text-[#456DFF]">
                  {prevStory.title}
                </div>
              </div>
            </Link>
          ) : (
            <span />
          )}

          {nextStory && (
            <Link
              to={`/stories/${nextStory.slug}`}
              className="group flex items-center justify-end gap-3 text-right"
            >
              <div>
                <div className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                  Next Story
                </div>
                <div className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5] group-hover:text-[#456DFF]">
                  {nextStory.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#4E5565] group-hover:text-[#456DFF]" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
