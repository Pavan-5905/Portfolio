import type { Metadata } from "next";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { contact, focusAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  const GraduationIcon = iconMap.graduation;
  const LocationIcon = iconMap.map;

  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="About"
            title="A builder at the intersection of AI, software, and systems."
            copy="Computer Science undergraduate passionate about using intelligent systems to solve practical problems with clean architecture and polished user experiences."
          />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="glass rounded-lg p-6 md:p-8">
              <GraduationIcon className="mb-6 size-9 text-cyan-200" />
              <h2 className="text-2xl font-semibold text-white">
                B.Tech, Computer Science and Engineering
              </h2>
              <p className="mt-4 leading-7 text-white/[0.66]">
                Studying at Dadi Institute of Engineering and Technology with a current percentage
                of 72.3%. I enjoy solving real-world problems through scalable software and
                intelligent systems.
              </p>
              <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/[0.52]">Location</div>
                <div className="mt-1 flex items-center gap-2 text-white">
                  <LocationIcon className="size-4 text-cyan-200" />
                  {contact.location}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area, index) => {
                const Icon = iconMap[area.icon];
                return (
                  <Reveal
                    key={area.title}
                    delay={index * 0.03}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-panel backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.065]"
                  >
                    <Icon className="mb-4 size-6 text-cyan-200" />
                    <h3 className="font-semibold text-white">{area.title}</h3>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
