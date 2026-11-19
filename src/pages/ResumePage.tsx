import { Download, Printer } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PORTFOLIO_PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from '../data/portfolio';
import { usePageMeta } from '../hooks/usePageMeta';

export function ResumePage() {
  usePageMeta(
    'Resume — Darshan Kumar J',
    'Printable and downloadable resume of Darshan Kumar J, Python Full-Stack Developer.',
  );

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        {/* Actions Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 no-print">
          <div>
            <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
              Curriculum Vitae
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#111318] dark:text-[#F5F5F5]">
              Resume Preview
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-black/12 dark:border-white/12 bg-white dark:bg-[#20232B] px-4 py-2 text-xs font-medium text-[#111318] dark:text-[#F5F5F5]"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print</span>
            </button>
            <a
              href="/api/resume.pdf"
              download="Darshan_Kumar_J_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Printable Document */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-8 sm:p-10 space-y-8">
          <header className="border-b border-black/10 dark:border-white/10 pb-6">
            <h2 className="font-display text-3xl font-bold text-[#111318] dark:text-[#F5F5F5]">
              {PORTFOLIO_PROFILE.name}
            </h2>
            <p className="mt-1 text-base font-medium text-[#3458EB] dark:text-[#456DFF]">
              {PORTFOLIO_PROFILE.title}
            </p>
            <p className="mt-2 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
              {PORTFOLIO_PROFILE.location} · {PORTFOLIO_PROFILE.email} · {PORTFOLIO_PROFILE.phone}
            </p>
          </header>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#3458EB] dark:text-[#456DFF]">
              Professional Summary
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
              {PORTFOLIO_PROFILE.experienceYears} of professional experience building scalable web applications, backend services, responsive interfaces, and database-driven systems across enterprise platforms, e-commerce, healthcare, and data-driven projects.
            </p>
          </section>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#3458EB] dark:text-[#456DFF]">
              Experience
            </h3>
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                    {exp.role} — {exp.company} ({exp.location})
                  </h4>
                  <span className="font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                    {exp.duration}
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1] list-disc pl-5">
                  {exp.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#3458EB] dark:text-[#456DFF]">
              Key Projects
            </h3>
            <div className="mt-3 space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {proj.title} — {proj.subtitle}
                    </h4>
                    <span className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
                      {proj.classification}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                    {proj.summary} ({proj.techStack.join(', ')})
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#3458EB] dark:text-[#456DFF]">
              Technical Skills
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
              {SKILL_GROUPS.map((grp) => (
                <div key={grp.category}>
                  <span className="font-semibold text-[#111318] dark:text-[#F5F5F5]">
                    {grp.category}:{' '}
                  </span>
                  <span className="text-[#4E5565] dark:text-[#A0A5B1]">
                    {grp.items.map((i) => i.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#3458EB] dark:text-[#456DFF]">
                Education
              </h3>
              <div className="mt-3 space-y-3 text-xs">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree}>
                    <div className="font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {edu.degree} ({edu.period})
                    </div>
                    <div className="text-[#4E5565] dark:text-[#A0A5B1]">
                      {edu.institution} · {edu.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#3458EB] dark:text-[#456DFF]">
                Certifications
              </h3>
              <div className="mt-3 space-y-3 text-xs">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.title}>
                    <div className="font-semibold text-[#111318] dark:text-[#F5F5F5]">
                      {c.title}
                    </div>
                    <div className="text-[#4E5565] dark:text-[#A0A5B1]">
                      {c.issuer} · {c.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
