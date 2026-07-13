import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Download, ExternalLink, Rocket, Send } from "lucide-react";

import { PageSection, Reveal } from "@/components/page-motion";
import { ProfileCarousel } from "@/components/profile-carousel";
import { SocialDock } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroIntro, resume, stats } from "@/lib/site-data";

const DeveloperScene = dynamic(
  () => import("@/components/developer-scene").then((mod) => mod.DeveloperScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[22rem] w-full items-center justify-center sm:h-[26rem] md:h-[38rem]">
        <div className="h-24 w-24 rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-glow-cyan" />
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="relative z-10">
      <PageSection className="flex min-h-screen items-center pt-28">
        <div className="container grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <Reveal className="max-w-3xl">
            <h1 className="text-balance font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl md:text-7xl">
              Pavan Kumar Ketha
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.68] sm:text-xl">
              {heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={resume.href} download>
                  <Download />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/projects">
                  <Rocket />
                  View Projects
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact">
                  <Send />
                  Contact Me
                </Link>
              </Button>
            </div>
            <div className="mt-7">
              <SocialDock />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:justify-self-end">
            <ProfileCarousel />
          </Reveal>
        </div>
      </PageSection>

      <section className="relative z-10 pb-24">
        <div className="container grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-5">
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-sm leading-5 text-white/[0.55]">{stat.label}</div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <DeveloperScene />
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 pb-28">
        <div className="container">
          <Reveal className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <Badge className="mb-4 border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                Latest resume
              </Badge>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Resume updated for July 2026.
              </h2>
              <p className="mt-4 leading-7 text-white/[0.64]">
                The download and preview use the latest resume stored with the site assets.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={resume.href} download>
                    <Download />
                    Download
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={resume.href} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    Preview
                  </a>
                </Button>
              </div>
            </div>
            <a
              href={resume.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] shadow-panel"
            >
              <Image
                src={resume.preview}
                alt="Resume preview"
                fill
                sizes="(max-width: 1024px) 92vw, 720px"
                className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
