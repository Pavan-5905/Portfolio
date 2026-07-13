import type { Metadata } from "next";
import Image from "next/image";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { communityService } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Community Service"
};

export default function CommunityServicePage() {
  const FarmIcon = iconMap.farm;

  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Community Service"
            title={communityService.title}
            copy={communityService.description}
          />
          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
              <FarmIcon className="mb-6 size-10 text-emerald-200" />
              <h2 className="text-2xl font-semibold text-white">Duration</h2>
              <p className="mt-3 text-white/[0.64]">{communityService.duration}</p>
              <h3 className="mt-8 text-lg font-semibold text-white">Objectives</h3>
              <ul className="mt-4 space-y-3 text-white/[0.64]">
                {communityService.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">Topics Covered</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {communityService.topics.map((topic) => (
                  <span key={topic} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/[0.66]">
                    {topic}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <h2 className="mb-5 text-2xl font-semibold text-white">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {communityService.gallery.map((src, index) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-panel">
                  <Image
                    src={src}
                    alt={`Community service project photograph ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 31vw"
                    className="object-cover transition duration-500 hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </PageSection>
    </main>
  );
}
