"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { iconMap } from "@/components/icon-map";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Button } from "@/components/ui/button";
import { contact, navItems, resume, socials } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SocialDock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <Button
            key={item.label}
            asChild
            variant="secondary"
            size={compact ? "sm" : "icon"}
            aria-label={item.label}
          >
            <a
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
            >
              <Icon />
              {compact ? item.label : null}
            </a>
          </Button>
        );
      })}
    </div>
  );
}

function SiteNav({
  pathname,
  menuOpen,
  setMenuOpen
}: {
  pathname: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/[0.34] px-3 py-2 shadow-panel backdrop-blur-2xl">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-white"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-slate-950 shadow-glow-cyan">
            PK
          </span>
          <span className="hidden sm:inline">Pavan Kumar Ketha</span>
        </Link>

        <div className="hidden min-w-0 items-center gap-1 overflow-x-auto px-2 xl:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-white/60 transition hover:bg-white/[0.08] hover:text-white",
                  active && "bg-white/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="ghost" size="icon" aria-label="GitHub profile">
            <a href="https://github.com/Pavan-5905" target="_blank" rel="noreferrer">
              {(() => {
                const GitHubIcon = iconMap.github;
                return <GitHubIcon />;
              })()}
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={resume.href} download>
              Resume
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </nav>
    </header>
  );
}

function MobileMenu({
  pathname,
  menuOpen,
  setMenuOpen
}: {
  pathname: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  if (!menuOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="fixed inset-x-3 top-20 z-40 rounded-lg border border-white/10 bg-black/[0.82] p-3 shadow-panel backdrop-blur-2xl xl:hidden"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={cn(
              "rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-3 text-sm text-white/70 transition",
              pathname === item.href && "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="container flex flex-col gap-4 text-sm text-white/[0.52] md:flex-row md:items-center md:justify-between">
        <p>© 2026 Pavan Kumar Ketha</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="transition hover:text-cyan-100" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <span>{contact.location}</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || reduceMotion) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      gsap.to(glow, { autoAlpha: 1, duration: 0.28, ease: "power2.out" });
      xTo(event.clientX);
      yTo(event.clientY);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <SmoothScroll />
      <div className="noise" />
      <div ref={glowRef} className="cursor-glow hidden md:block" />
      <div className="grid-mask fixed inset-0 z-0 opacity-50" />
      <div className="aurora-field animate-aurora" />

      <SiteNav pathname={pathname} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence>{menuOpen ? <MobileMenu pathname={pathname} menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}</AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}
