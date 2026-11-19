import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { ScrollProgressBar } from './ScrollProgressBar';
import { useTheme } from './ThemeContext';

const NAV_ITEMS = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Stories', to: '/stories' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 no-print ${
        scrolled
          ? 'bg-[#F7F8FA]/92 dark:bg-[#101114]/92 backdrop-blur-md border-black/10 dark:border-white/10 py-3'
          : 'bg-[#F7F8FA]/80 dark:bg-[#101114]/80 backdrop-blur-sm border-black/6 dark:border-white/6 py-4'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-base sm:text-lg font-display font-semibold tracking-tight text-[#111318] dark:text-[#F5F5F5] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#456DFF]"
        >
          <LogoMark className="w-7 h-7 shrink-0" />
          <span>Darshan Kumar J</span>
        </Link>

        {/* Zone 2: 5 Concise Single-Line Text Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#456DFF] ${
                  isActive
                    ? 'text-[#111318] dark:text-[#F5F5F5] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#456DFF]'
                    : 'text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/api/resume.pdf"
            download="Darshan_Kumar_J_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#456DFF]"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 text-[#111318] dark:text-[#F5F5F5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-[#F7F8FA] dark:bg-[#101114] px-5 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <Link
              to="/"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#111318] dark:text-[#F5F5F5] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Home
            </Link>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-[#456DFF]/12 text-[#3458EB] dark:text-[#456DFF]'
                      : 'text-[#4E5565] dark:text-[#A0A5B1] hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/resume"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:bg-black/5 dark:hover:bg-white/5"
            >
              View Resume
            </Link>
          </nav>

          <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-xs font-medium text-[#111318] dark:text-[#F5F5F5]"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dark Theme</span>
                </>
              )}
            </button>

            <a
              href="/api/resume.pdf"
              download="Darshan_Kumar_J_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0">
        <ScrollProgressBar />
      </div>
    </header>
  );
}
