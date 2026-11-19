import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layout,
  Server,
} from 'lucide-react';
import { PROJECTS, SKILL_GROUPS } from '../data/portfolio';
import { SpotlightCard } from './SpotlightCard';

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  Programming: Code2,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  'DevOps and Cloud': Cloud,
  'AI and Data': BrainCircuit,
};

function findMatchingProjects(skillName: string) {
  const clean = skillName.replace(/\(.*?\)/g, '').trim().toLowerCase();
  return PROJECTS.filter(
    (p) =>
      p.techStack.some((t) => t.toLowerCase().includes(clean) || clean.includes(t.toLowerCase())) ||
      p.summary.toLowerCase().includes(clean) ||
      p.contributions.some((c) => c.toLowerCase().includes(clean)),
  );
}

export function SkillsSection() {
  const categories = ['All', ...SKILL_GROUPS.map((g) => g.category)];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const visibleGroups =
    selectedCategory === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === selectedCategory);

  const relatedProjects = selectedSkill ? findMatchingProjects(selectedSkill) : [];

  return (
    <section id="skills" className="py-20 border-t border-black/8 dark:border-white/8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
              Technical Arsenal
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
              Core Technologies &amp; Engineering Stack
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
              Select any category or click a technology below to inspect where it is applied across projects.
            </p>
          </div>
        </div>

        {/* Interactive Category Filter Buttons */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mt-8 flex flex-wrap items-center gap-1.5 rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-1.5"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
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

        {/* Selected Skill Cross-Reference Banner */}
        {selectedSkill && (
          <div className="mt-6 rounded-2xl border border-[#456DFF]/35 bg-[#456DFF]/6 dark:bg-[#456DFF]/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                  Selected Technology: {selectedSkill}
                </span>
                <p className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                  {relatedProjects.length > 0
                    ? `Applied in ${relatedProjects.length} portfolio build${relatedProjects.length > 1 ? 's' : ''}:`
                    : 'Used in professional engineering work at CirrusLabs.io or foundational coursework.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="text-xs font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]"
              >
                Clear selection
              </button>
            </div>

            {relatedProjects.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {relatedProjects.map((proj) => (
                  <Link
                    key={proj.slug}
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] px-3 py-1.5 text-xs font-medium text-[#111318] dark:text-[#F5F5F5] hover:border-[#456DFF]"
                  >
                    <span>{proj.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#456DFF]" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skill Groups Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group) => {
            const Icon = CATEGORY_ICONS[group.category] ?? Code2;
            return (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.28 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/8 dark:border-white/10 bg-[#ECEEF3] dark:bg-[#191C24] text-[#3458EB] dark:text-[#456DFF]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {group.category}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                    {group.description}
                  </p>

                  <ul className="mt-5 divide-y divide-black/6 dark:divide-white/6 border-t border-black/6 dark:border-white/6">
                    {group.items.map((skill) => {
                      const isPicked = selectedSkill === skill.name;
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedSkill((prev) =>
                                prev === skill.name ? null : skill.name,
                              )
                            }
                            className={`flex w-full items-baseline justify-between gap-3 py-2.5 text-left text-sm transition-colors ${
                              isPicked
                                ? 'text-[#3458EB] dark:text-[#456DFF]'
                                : 'text-[#111318] dark:text-[#F5F5F5] hover:text-[#3458EB] dark:hover:text-[#456DFF]'
                            }`}
                          >
                            <span className="font-medium">{skill.name}</span>
                            {skill.note && (
                              <span className="text-right text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                                {skill.note}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
