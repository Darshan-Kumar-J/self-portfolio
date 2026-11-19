import { Award, Briefcase, GraduationCap } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  ENGINEERING_PHILOSOPHY,
  EXPERIENCE,
} from '../data/portfolio';
import { usePageMeta } from '../hooks/usePageMeta';

export function ExperiencePage() {
  usePageMeta(
    'Experience & Education — Darshan Kumar J',
    'Professional experience at CirrusLabs.io, MCA & BCA education, and certifications of Darshan Kumar J.',
  );

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
            Professional Background
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
            Experience That Shapes Engineering.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
            3 years of professional software engineering experience backed by formal computer applications training in Bengaluru and Mysuru.
          </p>
        </div>

        {/* Career Experience */}
        <section className="mt-12 space-y-6">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.company}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-[#ECEEF3] dark:bg-[#191C24] text-[#3458EB] dark:text-[#456DFF]">
                    <Briefcase className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {exp.role} — {exp.company}
                    </h2>
                    <p className="text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                      {exp.location}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-medium text-[#3458EB] dark:text-[#456DFF]">
                  {exp.duration}
                </span>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {exp.summary}
              </p>

              <h3 className="mt-6 font-mono text-xs uppercase tracking-wider text-[#4E5565] dark:text-[#A0A5B1]">
                Core Responsibilities
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {exp.responsibilities.map((resp) => (
                  <li
                    key={resp}
                    className="flex items-start gap-2.5 text-sm text-[#4E5565] dark:text-[#A0A5B1]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#456DFF] shrink-0" aria-hidden="true" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education & Certifications */}
        <section className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-[#3458EB] dark:text-[#456DFF]" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                Education
              </h2>
            </div>

            <div className="mt-6 space-y-6 divide-y divide-black/8 dark:divide-white/8">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="pt-6 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {edu.degree}
                    </h3>
                    <span className="font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1] tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
                    {edu.institution}
                  </p>
                  <p className="mt-2 font-mono text-xs font-medium text-[#189C68] dark:text-[#35C58A] tabular-nums">
                    {edu.score}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#7C3AED] dark:text-[#8B5CF6]" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
                Certifications
              </h2>
            </div>

            <div className="mt-6 space-y-6 divide-y divide-black/8 dark:divide-white/8">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="pt-6 first:pt-0">
                  <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                    {cert.issuer} · {cert.date}
                  </p>
                  <p className="mt-2 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                    {cert.attachmentNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section className="mt-14 pt-12 border-t border-black/8 dark:border-white/8">
          <h2 className="font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
            How I Think as an Engineer.
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ENGINEERING_PHILOSOPHY.map((p) => (
              <div
                key={p.index}
                className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-5"
              >
                <span className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                  {p.index}
                </span>
                <h3 className="mt-2 font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
