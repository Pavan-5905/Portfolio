"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const revealVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] }
  }
};

export function Reveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={revealVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  copy,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-4xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <Badge className="mb-4 border-cyan-300/20 bg-cyan-300/10 text-cyan-100">{eyebrow}</Badge>
      <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-7 text-white/[0.64] sm:text-lg">{copy}</p>
    </Reveal>
  );
}

export function PageSection({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("section-shell", className)}>{children}</section>;
}
