import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/80 selection:bg-primary selection:text-primary-foreground border border-border/50 bg-input/70 text-foreground h-11 w-full min-w-0 rounded-xl px-4 py-2 text-base shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:px-4 file:text-[0.75rem] file:tracking-[0.15em] file:font-heading uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
