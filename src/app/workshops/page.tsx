import type { Metadata } from "next";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { workshops } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Workshops"
};

export default function WorkshopsPage() {
  const grouped = {
    Workshops: workshops.filter((item) => item.type === "Workshop"),
    "Industrial Visits": workshops.filter((item) => item.type === "Industrial Visit")
  };

  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Workshops & Industrial Visits"
            title="Applied learning through workshops and technical exposure."
            copy="Git and GitHub, Naval Dockyard, quantum computing, and parallel programming entries from the latest resume."
          />
          <div className="grid gap-10 lg:grid-cols-2">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <Reveal>
                  <h2 className="mb-5 text-2xl font-semibold text-white">{group}</h2>
                </Reveal>
                <div className="space-y-5">
                  {items.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <Reveal
                        key={item.title}
                        delay={index * 0.04}
                        className="relative border-l border-white/[0.12] pl-6"
                      >
                        <span className="absolute -left-3 top-1 flex size-6 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/[0.15]">
                          <span className="size-2 rounded-full bg-cyan-200" />
                        </span>
                        <article className="rounded-lg border border-white/10 bg-white/[0.052] p-5 shadow-panel backdrop-blur-xl">
                          <Icon className="mb-4 size-6 text-cyan-200" />
                          <div className="text-sm text-cyan-100">{item.date}</div>
                          <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-3 leading-7 text-white/[0.64]">{item.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.keyLearnings.map((learning) => (
                              <span key={learning} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/[0.62]">
                                {learning}
                              </span>
                            ))}
                          </div>
                        </article>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
