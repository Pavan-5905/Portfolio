import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { Button } from "@/components/ui/button";
import { hackerRank } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Community"
};

export default function CommunityPage() {
  const HackerRankIcon = iconMap.hackerrank;

  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Community"
            title="HackerRank profile and coding community presence."
            copy="The community page is focused on HackerRank, with badges, certificates, skills, and achievements."
          />
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
              <HackerRankIcon className="mb-6 size-10 text-cyan-200" />
              <h2 className="text-3xl font-semibold text-white">{hackerRank.label}</h2>
              <p className="mt-3 text-white/[0.62]">@{hackerRank.username}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={hackerRank.profileHref} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    Profile
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={hackerRank.href} target="_blank" rel="noreferrer">
                    Legacy Link
                  </a>
                </Button>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["Badges", hackerRank.badges],
                ["Certificates", hackerRank.certificates],
                ["Skills", hackerRank.skills],
                ["Community achievements", hackerRank.achievements]
              ].map(([title, items], index) => (
                <Reveal key={title as string} delay={index * 0.04} className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
                  <h2 className="text-xl font-semibold text-white">{title as string}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(items as string[]).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-white/[0.64]">
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
