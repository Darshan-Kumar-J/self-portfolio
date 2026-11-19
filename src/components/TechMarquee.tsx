const STACK_RIBBON = [
  'Python',
  'Django',
  'FastAPI',
  'React 19',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Supabase RLS',
  'SQLite Locking',
  'Redis',
  'Docker',
  'AWS EC2 · VPC · S3',
  'Gemini API',
  'React Flow',
];

export function TechMarquee() {
  const repeated = [...STACK_RIBBON, ...STACK_RIBBON];

  return (
    <div
      aria-label="Engineering technologies marquee"
      className="relative overflow-hidden border-y border-black/8 dark:border-white/8 bg-[#ECEEF3]/70 dark:bg-[#191C24]/70 py-3.5"
    >
      <div className="animate-marquee items-center gap-6 px-4">
        {repeated.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-6 shrink-0">
            <span className="font-mono text-xs tracking-wide text-[#4E5565] dark:text-[#A0A5B1] whitespace-nowrap">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#456DFF]/60 shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
