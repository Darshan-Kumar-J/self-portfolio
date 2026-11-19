import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TECHNICAL_STORIES } from '../data/stories';
import { usePageMeta } from '../hooks/usePageMeta';

export function StoriesPage() {
  usePageMeta(
    'Behind the Code — Technical Stories | Darshan Kumar J',
    '10-part engineering case studies covering payment verification, atomic appointment locking, enterprise developer portals, and database security.',
  );

  const categories = ['All', ...Array.from(new Set(TECHNICAL_STORIES.map((s) => s.category)))];
  const [selected, setSelected] = useState('All');

  const stories =
    selected === 'All'
      ? TECHNICAL_STORIES
      : TECHNICAL_STORIES.filter((s) => s.category === selected);

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
            Behind the Code
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
            Technical Storytelling &amp; Architecture Case Studies
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
            Structured deep dives examining the problem, engineering constraints, architecture diagrams, security boundaries, and practical takeaways behind each system.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter stories by engineering domain"
          className="mt-8 inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-1.5"
        >
          {categories.map((cat) => {
            const active = selected === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(cat)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white dark:bg-[#20232B] text-[#111318] dark:text-[#F5F5F5] shadow-sm'
                    : 'text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.slug}
              className="flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                <span className="text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                  {story.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{story.category}</span>
                <span aria-hidden="true">·</span>
                <span>{story.projectTitle}</span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#111318] dark:text-[#F5F5F5]">
                <Link
                  to={`/stories/${story.slug}`}
                  className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors"
                >
                  {story.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.subtitle}
              </p>

              <p className="mt-4 border-t border-black/6 dark:border-white/6 pt-4 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {story.sections.problem}
              </p>

              <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                  {story.readFocus}
                </span>
                <Link
                  to={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
