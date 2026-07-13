import type { Metadata } from "next";

import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { skills } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Skills"
};

export default function SkillsPage() {
  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Skills"
            title="Technical range for intelligent product engineering."
            copy="Resume-backed skills across programming, AI engineering, data, tools, and practical software foundations."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => (
              <Reveal
                key={skill.group}
                delay={index * 0.04}
                className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl"
              >
                <h2 className="text-lg font-semibold text-white">{skill.group}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/[0.22] px-3 py-1.5 text-sm text-white/[0.66]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
