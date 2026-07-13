import type { Metadata } from "next";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { leadership } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Leadership"
};

export default function LeadershipPage() {
  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Leadership"
            title="Campus leadership, volunteering, and summit experience."
            copy="Resume-backed roles shown as focused cards with organization, context, and timeline."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {leadership.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <Reveal
                  key={item.role}
                  delay={index * 0.06}
                  className="group rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
                >
                  <Icon className="mb-6 size-8 text-cyan-200" />
                  <div className="text-sm font-semibold uppercase text-cyan-100">{item.role}</div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-white/[0.62]">{item.context}</p>
                  <p className="mt-4 text-sm text-white/[0.48]">{item.period}</p>
                  <p className="mt-5 leading-7 text-white/[0.66]">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
