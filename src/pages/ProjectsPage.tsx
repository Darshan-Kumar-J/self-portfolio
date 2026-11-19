import { useState } from 'react';
import { Search } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { usePageMeta } from '../hooks/usePageMeta';
import { ProjectCard } from '../components/ProjectCard';

const CATEGORIES = ['All', 'Full-Stack', 'Enterprise', 'Healthcare', 'Research & Academic'] as const;

export function ProjectsPage() {
  usePageMeta(
    'Projects — Darshan Kumar J',
    'Case studies across e-commerce, enterprise developer portals, clinic appointment scheduling, and academic research.',
  );

  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = PROJECTS.filter((p) => {
    const matchesCat = category === 'All' || p.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
            Case Study Library
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
            Featured Projects &amp; Engineering Systems
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
            Filter by domain or search by technology to inspect architecture decisions, database models, and security implementations.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-1.5"
          >
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
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

          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E5565] dark:text-[#A0A5B1]"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search projects by technology"
              placeholder="Filter by technology (e.g. PostgreSQL, Django, React)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] pl-10 pr-4 py-2.5 text-xs text-[#111318] dark:text-[#F5F5F5] placeholder:text-[#4E5565]/70 dark:placeholder:text-[#A0A5B1]/70 focus:border-[#456DFF] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-10 text-center">
            <p className="text-sm text-[#4E5565] dark:text-[#A0A5B1]">
              No matching projects found for &ldquo;{query}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setQuery('');
              }}
              className="mt-3 text-xs font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
