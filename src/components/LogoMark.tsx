export function LogoMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        width="64"
        height="64"
        rx="14"
        className="fill-[#191C24] dark:fill-[#191C24] stroke-[#456DFF]/40"
        strokeWidth="2"
      />
      <path
        d="M18 18H28.5C36.5081 18 42 23.6274 42 32C42 40.3726 36.5081 46 28.5 46H18V18Z"
        stroke="#F5F5F5"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M37 22L47 18V46L37 42"
        stroke="#456DFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="18" r="2.5" fill="#8B5CF6" />
      <circle cx="47" cy="46" r="2.5" fill="#35C58A" />
    </svg>
  );
}
