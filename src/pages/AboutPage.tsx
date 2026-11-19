import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  ENGINEERING_PHILOSOPHY,
  EXPERIENCE,
  PORTFOLIO_PROFILE,
} from '../data/portfolio';
import { usePageMeta } from '../hooks/usePageMeta';
import { ProfilePortrait } from '../components/ProfilePortrait';

export function AboutPage() {
  usePageMeta(
    'About — Darshan Kumar J',
    'Career journey, engineering philosophy, education, and technical background of Darshan Kumar J.',
  );

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <ProfilePortrait variant="about" priority />
          </div>

          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
              About Darshan Kumar J
            </p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
              More Than Just Writing Code.
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
              {PORTFOLIO_PROFILE.aboutIntro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] transition-colors"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="/api/resume.pdf"
                download="Darshan_Kumar_J_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-black/12 dark:border-white/12 bg-white dark:bg-[#20232B] px-5 py-2.5 text-sm font-medium text-[#111318] dark:text-[#F5F5F5]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Career Journey Timeline */}
        <section className="mt-20 pt-16 border-t border-black/8 dark:border-white/8">
          <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
            Career &amp; Academic Journey
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#111318] dark:text-[#F5F5F5]">
            Timeline
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6">
              <span className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
                {EXPERIENCE[0].duration}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-[#111318] dark:text-[#F5F5F5]">
                {EXPERIENCE[0].role} · {EXPERIENCE[0].company}
              </h3>
              <p className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                {EXPERIENCE[0].location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                {EXPERIENCE[0].summary}
              </p>
            </div>

            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6"
              >
                <span className="font-mono text-xs text-[#7C3AED] dark:text-[#8B5CF6] tabular-nums">
                  {edu.period}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                  {edu.institution}
                </p>
                <p className="mt-3 font-mono text-xs text-[#189C68] dark:text-[#35C58A] tabular-nums">
                  {edu.score}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section className="mt-20 pt-16 border-t border-black/8 dark:border-white/8">
          <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
            Engineering Philosophy
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#111318] dark:text-[#F5F5F5]">
            How I Think as an Engineer.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGINEERING_PHILOSOPHY.map((item) => (
              <div
                key={item.index}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-5"
              >
                <div className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF] tabular-nums">
                  {item.index}
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mt-20 pt-16 border-t border-black/8 dark:border-white/8">
          <h2 className="font-display text-2xl font-semibold text-[#111318] dark:text-[#F5F5F5]">
            Certifications
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-6"
              >
                <h3 className="font-display text-base font-semibold text-[#111318] dark:text-[#F5F5F5]">
                  {cert.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                  {cert.issuer} · {cert.date}
                </p>
                <p className="mt-3 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                  {cert.attachmentNote}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
