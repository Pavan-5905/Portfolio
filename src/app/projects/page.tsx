import type { Metadata } from "next";
import { Github } from "lucide-react";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Projects"
            title="Resume projects with practical AI, vision, and embedded systems depth."
            copy="Each project keeps the resume source content at the center: description, stack, learning, future scope, architecture placeholder, and repository."
          />
          <div className="grid gap-6">
            {projects.map((project, index) => {
              const Icon = iconMap[project.icon];
              return (
                <Reveal
                  key={project.title}
                  delay={index * 0.05}
                  className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl md:p-8"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-lg border border-white/10 bg-black/[0.24] text-cyan-100 shadow-glow-cyan">
                        <Icon className="size-5" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                      <p className="mt-4 leading-7 text-white/[0.66]">{project.description}</p>
                    </div>
                    <Button asChild variant="secondary">
                      <a href={project.repository} target="_blank" rel="noreferrer">
                        <Github />
                        Repository
                      </a>
                    </Button>
                  </div>

                  <div className="mt-7 grid gap-5 lg:grid-cols-3">
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-cyan-100">Tech Stack</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.techStack.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/[0.66]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-cyan-100">Features</h3>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-white/[0.64]">
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-cyan-100">Learning & Scope</h3>
                      <p className="mt-3 text-sm leading-6 text-white/[0.64]">{project.keyLearnings}</p>
                      <p className="mt-3 text-sm leading-6 text-white/[0.64]">{project.futureScope}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-dashed border-white/15 bg-black/20 p-5 text-sm leading-6 text-white/[0.58]">
                    {project.architecture}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
