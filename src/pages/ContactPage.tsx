import { Mail, MapPin, Phone } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { usePageMeta } from '../hooks/usePageMeta';
import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
  usePageMeta(
    'Contact — Darshan Kumar J',
    'Connect with Darshan Kumar J, Python Full-Stack Developer in Bengaluru, India.',
  );

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-[#3458EB] dark:text-[#456DFF]">
              Contact
            </p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance text-[#111318] dark:text-[#F5F5F5]">
              Have an Interesting Idea? Let&apos;s Build Something.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
              I&apos;m always interested in connecting with people who are passionate about technology, engineering and building useful digital products.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="flex items-center gap-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4 hover:border-[#456DFF]/50 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#3458EB] dark:text-[#456DFF] shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">Email</div>
                  <div className="text-sm font-medium text-[#111318] dark:text-[#F5F5F5]">
                    {PORTFOLIO_PROFILE.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${PORTFOLIO_PROFILE.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4 hover:border-[#456DFF]/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#189C68] dark:text-[#35C58A] shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">Phone</div>
                  <div className="text-sm font-medium tabular-nums text-[#111318] dark:text-[#F5F5F5]">
                    {PORTFOLIO_PROFILE.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#20232B] p-4">
                <MapPin className="w-4 h-4 text-[#7C3AED] dark:text-[#8B5CF6] shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-[#4E5565] dark:text-[#A0A5B1]">Location</div>
                  <div className="text-sm font-medium text-[#111318] dark:text-[#F5F5F5]">
                    {PORTFOLIO_PROFILE.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24] p-4 text-xs leading-relaxed text-[#4E5565] dark:text-[#A0A5B1]">
              Social links (LinkedIn and GitHub) are intentionally omitted until verified URLs are configured in <span className="font-mono">src/data/portfolio.ts</span>.
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
