"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profileImages } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function ProfileCarousel() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [reduceMotion ? 0 : -7, reduceMotion ? 0 : 7]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [reduceMotion ? 0 : 6, reduceMotion ? 0 : -6]);

  const active = profileImages[index];

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + profileImages.length) % profileImages.length);
  };

  useEffect(() => {
    if (expanded) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % profileImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [expanded]);

  const dots = useMemo(() => profileImages.map((_, dotIndex) => dotIndex), []);

  return (
    <>
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
          pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
        onPointerDown={(event) => setDragStart(event.clientX)}
        onPointerUp={(event) => {
          if (dragStart === null) return;
          const distance = event.clientX - dragStart;
          if (Math.abs(distance) > 48) {
            goTo(index + (distance < 0 ? 1 : -1));
          }
          setDragStart(null);
        }}
        className="relative mx-auto w-full max-w-md touch-pan-y"
      >
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] shadow-panel outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Open profile photograph"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.src}
              initial={{ opacity: 0, x: 28, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -28, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 768px) 92vw, 420px"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </button>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Button type="button" variant="secondary" size="icon" aria-label="Previous profile photograph" onClick={() => goTo(index - 1)}>
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            {dots.map((dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Show profile photograph ${dot + 1}`}
                onClick={() => goTo(dot)}
                className={cn(
                  "size-2 rounded-full bg-white/30 transition",
                  dot === index && "w-6 bg-cyan-200"
                )}
              />
            ))}
          </div>
          <Button type="button" variant="secondary" size="icon" aria-label="Next profile photograph" onClick={() => goTo(index + 1)}>
            <ChevronRight />
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/[0.82] p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4"
              aria-label="Close profile photograph"
              onClick={() => setExpanded(false)}
            >
              <X />
            </Button>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="relative h-[82vh] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-black shadow-panel"
            >
              <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
