function IconShell({ children, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconShell>
  );
}

export function ArrowLeftIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </IconShell>
  );
}

export function SparkIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="m12 3 1.8 5.3L19 10.1l-5.2 1.6L12 17l-1.8-5.3L5 10.1l5.2-1.8L12 3Z" />
    </IconShell>
  );
}

export function BoltIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" />
    </IconShell>
  );
}

export function ChartIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-8" />
      <path d="M4 19h16" />
    </IconShell>
  );
}

export function CheckShieldIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="M12 3 4.5 6.5v5.1c0 4.8 3.3 7.9 7.5 9.9 4.2-2 7.5-5.1 7.5-9.9V6.5L12 3Z" />
      <path d="m9.4 12.1 1.9 1.9 3.8-4" />
    </IconShell>
  );
}

export function CheckIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="m20 6-11 11-5-5" />
    </IconShell>
  );
}

export function AlertIcon({ className = "" }) {
  return (
    <IconShell className={className}>
      <path d="M10.3 3.7 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </IconShell>
  );
}