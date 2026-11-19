import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Moon, Phone, Sun } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { LogoMark } from './LogoMark';
import { useTheme } from './ThemeContext';

export function Footer() {
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24]/60 no-print">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Intro */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-display font-semibold text-[#111318] dark:text-[#F5F5F5]">
              <LogoMark className="w-7 h-7" />
              <span>{PORTFOLIO_PROFILE.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1] max-w-sm">
              {PORTFOLIO_PROFILE.title} in {PORTFOLIO_PROFILE.location}. Focused on building reliable web applications, relational architectures, and thoughtful digital experiences.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{PORTFOLIO_PROFILE.email}</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`tel:${PORTFOLIO_PROFILE.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{PORTFOLIO_PROFILE.phone}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#4E5565] dark:text-[#A0A5B1]">
                Portfolio
              </h3>
              <ul className="space-y-2 text-[#111318] dark:text-[#F5F5F5]">
                <li><Link to="/" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">About</Link></li>
                <li><Link to="/projects" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">Projects</Link></li>
                <li><Link to="/stories" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">Behind the Code</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#4E5565] dark:text-[#A0A5B1]">
                Profile
              </h3>
              <ul className="space-y-2 text-[#111318] dark:text-[#F5F5F5]">
                <li><Link to="/experience" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">Experience</Link></li>
                <li><Link to="/resume" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">Resume</Link></li>
                <li><Link to="/contact" className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Theme & Controls */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] px-3.5 py-2 text-xs font-medium text-[#111318] dark:text-[#F5F5F5] hover:border-[#456DFF]/50 transition-colors whitespace-nowrap shrink-0"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#456DFF]" aria-hidden="true" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#3458EB]" aria-hidden="true" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] px-3 py-2 text-xs font-medium text-[#111318] dark:text-[#F5F5F5] hover:border-[#456DFF]/50 transition-colors whitespace-nowrap shrink-0"
              >
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Top</span>
              </button>
            </div>

            <p className="text-xs text-[#4E5565] dark:text-[#A0A5B1] md:text-right">
              {PORTFOLIO_PROFILE.socialLinks.linkedin || PORTFOLIO_PROFILE.socialLinks.github
                ? 'Social profiles connected'
                : 'LinkedIn & GitHub URLs configurable in portfolio data'}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/8 dark:border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
          <p>© {new Date().getFullYear()} {PORTFOLIO_PROFILE.name}. All rights reserved.</p>
          <p>{PORTFOLIO_PROFILE.location} · {PORTFOLIO_PROFILE.currentRole}</p>
        </div>
      </div>
    </footer>
  );
}
