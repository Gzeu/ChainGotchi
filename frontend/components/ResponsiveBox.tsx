import React from "react";
export default function ResponsiveBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-zinc-900 w-full max-w-xs md:max-w-md shadow-lg mx-auto transition-all duration-200">
      {children}
    </div>
  );
}
