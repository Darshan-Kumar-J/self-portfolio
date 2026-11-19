import React, { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Code2, Mail, MapPin, ShieldCheck, User } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

interface ProfilePortraitProps {
  variant: 'hero' | 'about';
  priority?: boolean;
}

type HeroLens = 'portrait' | 'backend' | 'security';

const HERO_LENS_SNIPPETS: Record<
  Exclude<HeroLens, 'portrait'>,
  { filename: string; summary: string; code: string }
> = {
  backend: {
    filename: 'services/onboarding_api.py',
    summary: 'Python · Django · FastAPI · PostgreSQL 16',
    code: `@router.post("/producers/onboard")
async def advance_onboarding(step: int, payload: ProducerStep):
    # 5-step governance workflow with admin approval
    return await service.persist_and_audit(step, payload)`,
  },
  security: {
    filename: 'security/verify_signature.ts',
    summary: 'HMAC-SHA256 · scrypt · PostgreSQL RLS',
    code: `const expected = createHmac("sha256", secret)
  .update(\`\${orderId}|\${paymentId}\`)
  .digest("hex");
return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));`,
  },
};

export function ProfilePortrait({ variant, priority = false }: ProfilePortraitProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [heroLens, setHeroLens] = useState<HeroLens>('portrait');
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 180,
    damping: 22,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || variant !== 'hero') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isHero = variant === 'hero';

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        isHero && !shouldReduceMotion
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      className="relative group"
    >
      {/* Ambient blue/violet aura behind portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[#456DFF]/28 via-[#8B5CF6]/18 to-[#35C58A]/10 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative overflow-hidden rounded-2xl border border-black/12 dark:border-white/14 bg-white dark:bg-[#191C24] shadow-xl">
        {/* Top Interactive Lens Switcher on Hero */}
        {isHero && (
          <div className="flex items-center justify-between gap-2 border-b border-black/8 dark:border-white/10 bg-[#ECEEF3]/80 dark:bg-[#141720] px-3.5 py-2.5">
            <span className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1] truncate">
              darshan_kumar_j
            </span>
            <div
              role="tablist"
              aria-label="Inspect portrait or engineering code"
              className="flex items-center gap-1 rounded-lg bg-black/5 dark:bg-white/5 p-0.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={heroLens === 'portrait'}
                onClick={() => setHeroLens('portrait')}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                  heroLens === 'portrait'
                    ? 'bg-white dark:bg-[#20232B] text-[#111318] dark:text-[#F5F5F5] shadow-sm'
                    : 'text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                }`}
              >
                <User className="w-3 h-3" aria-hidden="true" />
                <span>Portrait</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={heroLens === 'backend'}
                onClick={() => setHeroLens('backend')}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                  heroLens === 'backend'
                    ? 'bg-white dark:bg-[#20232B] text-[#111318] dark:text-[#F5F5F5] shadow-sm'
                    : 'text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                }`}
              >
                <Code2 className="w-3 h-3" aria-hidden="true" />
                <span>API</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={heroLens === 'security'}
                onClick={() => setHeroLens('security')}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                  heroLens === 'security'
                    ? 'bg-white dark:bg-[#20232B] text-[#111318] dark:text-[#F5F5F5] shadow-sm'
                    : 'text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-[#F5F5F5]'
                }`}
              >
                <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                <span>Security</span>
              </button>
            </div>
          </div>
        )}

        {/* Portrait Photograph */}
        <div
          className={`relative w-full overflow-hidden bg-[#141720] ${
            isHero ? 'aspect-[4/4.6] sm:aspect-[4/4.5]' : 'aspect-[4/4.3]'
          }`}
        >
          {!imageUnavailable ? (
            <img
              src={PORTFOLIO_PROFILE.portraitPath}
              alt={PORTFOLIO_PROFILE.portraitAlt}
              width={480}
              height={550}
              loading={priority ? 'eager' : 'lazy'}
              decoding={priority ? 'sync' : 'async'}
              fetchPriority={priority ? 'high' : 'auto'}
              referrerPolicy="no-referrer"
              onError={() => setImageUnavailable(true)}
              className={`h-full w-full object-cover transition-transform duration-500 ${
                isHero
                  ? 'object-[50%_12%] group-hover:scale-[1.02]'
                  : 'object-[50%_8%] group-hover:scale-[1.03]'
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#141720] font-display text-4xl font-bold text-[#F5F5F5]">
              DK
            </div>
          )}

          {/* Subtle dark vignette at bottom to anchor profile card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#101114]/85 via-[#101114]/30 to-transparent"
          />

          {/* Interactive Code / Security Lens Overlay when selected */}
          {isHero && heroLens !== 'portrait' && (
            <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-[#101114]/92 backdrop-blur-md p-4 text-[#F5F5F5] shadow-2xl">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="font-mono text-[11px] text-[#456DFF]">
                  {HERO_LENS_SNIPPETS[heroLens].filename}
                </span>
                <span className="font-mono text-[10px] text-[#A0A5B1]">
                  {HERO_LENS_SNIPPETS[heroLens].summary}
                </span>
              </div>
              <pre className="mt-2.5 overflow-x-auto font-mono text-[11px] leading-relaxed text-[#E2E6F0]">
                <code>{HERO_LENS_SNIPPETS[heroLens].code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Profile Identity Card */}
        {isHero ? (
          <div className="border-t border-black/8 dark:border-white/10 bg-white dark:bg-[#20232B] p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-sm font-semibold tracking-wide text-[#111318] dark:text-[#F5F5F5]">
                  DARSHAN KUMAR J
                </h2>
                <p className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                  {PORTFOLIO_PROFILE.title}
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-1 text-xs text-[#4E5565] dark:text-[#A0A5B1]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#456DFF]" aria-hidden="true" />
                  <span>{PORTFOLIO_PROFILE.location}</span>
                </span>
                <a
                  href={`mailto:${PORTFOLIO_PROFILE.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#3458EB] dark:hover:text-[#456DFF] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" aria-hidden="true" />
                  <span>{PORTFOLIO_PROFILE.email}</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-black/8 dark:border-white/10 bg-white dark:bg-[#20232B] px-5 py-3.5">
            <p className="font-mono text-xs text-[#4E5565] dark:text-[#A0A5B1]">
              {PORTFOLIO_PROFILE.aboutCaption}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
