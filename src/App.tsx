/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './components/ThemeContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResumePage } from './pages/ResumePage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFoundPage() {
  return (
    <div className="py-24 text-center px-5">
      <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-[#111318] dark:text-[#F5F5F5]">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-[#4E5565] dark:text-[#A0A5B1]">
        The route you requested could not be found in this portfolio.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-5 py-2.5 text-sm font-medium text-white"
      >
        Return Home
      </Link>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18 }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<StoryDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#111318] dark:bg-[#101114] dark:text-[#F5F5F5] transition-colors duration-200">
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
