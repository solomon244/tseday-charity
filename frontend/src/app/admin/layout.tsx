import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-tsedey-light pt-24 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
