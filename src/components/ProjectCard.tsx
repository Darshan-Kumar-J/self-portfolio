import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Layers } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';
import { SpotlightCard } from './SpotlightCard';

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <SpotlightCard className="group h-full">
      <article className={`flex h-full flex-col ${featured ? 'lg:grid lg:grid-cols-12' : ''}`}>
        {/* Visual Frame */}
        <Link
          to={`/projects/${project.slug}`}
          className={`relative block overflow-hidden bg-[#ECEEF3] dark:bg-[#191C24] ${
            featured ? 'aspect-[4/3] lg:col-span-6 lg:aspect-auto lg:h-full' : 'aspect-[4/3] w-full'
          }`}
        >
          {!imgError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              width={800}
              height={600}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#191C24] to-[#20232B] p-6 text-center">
              <Layers className="w-8 h-8 text-[#456DFF]" aria-hidden="true" />
              <span className="mt-3 font-display text-sm font-medium text-[#F5F5F5]">
                {project.title}
              </span>
            </div>
          )}
        </Link>

        {/* Body */}
        <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:col-span-6 lg:p-7' : ''}`}>
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
            <span className="tabular-nums text-[#3458EB] dark:text-[#456DFF]">{project.index}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
          </div>

          <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-[#111318] dark:text-[#F5F5F5]">
            <Link
              to={`/projects/${project.slug}`}
              className="hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-1 text-xs font-medium text-[#4E5565] dark:text-[#A0A5B1]">
            {project.subtitle}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
            {project.summary}
          </p>

          {project.disclaimer && (
            <p className="mt-3 text-xs leading-relaxed text-[#7C3AED] dark:text-[#A78BFA]">
              {project.disclaimer}
            </p>
          )}

          {/* Key Highlight */}
          <div className="mt-4 pt-4 border-t border-black/8 dark:border-white/8 text-xs text-[#111318] dark:text-[#F5F5F5]">
            {project.keyHighlight}
          </div>

          {/* Clean Unboxed Tech Stack Line */}
          <p className="mt-2.5 font-mono text-[11px] leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
            {project.techStack.join(' · ')}
          </p>

          {/* Actions */}
          <div className="mt-auto pt-5 flex flex-wrap items-center gap-4">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3458EB] dark:text-[#456DFF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>View Case Study</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
