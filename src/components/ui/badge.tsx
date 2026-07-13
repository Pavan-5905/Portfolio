import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-1 text-xs font-medium text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
