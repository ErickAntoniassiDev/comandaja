type CartIconProps = {
  className?: string;
};

export function CartIcon({ className = "h-5 w-5" }: CartIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.25 3h1.386c.54 0 1.007.376 1.12.9l1.728 8.276a2.25 2.25 0 002.205 1.824h10.124a2.25 2.25 0 002.205-1.824l1.728-8.276a1.125 1.125 0 00-1.12-.9H5.106" />
      <circle cx="8.25" cy="20.25" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="18.75" cy="20.25" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}
