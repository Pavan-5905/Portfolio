import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { certifications } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Certifications"
};

export default function CertificationsPage() {
  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Certifications"
            title="Certificate cards with verified resume credentials."
            copy="Python, front-end development, Adobe Creative Cloud, MS Office, and Excel credentials from the latest resume."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certificate, index) => {
              const Icon = iconMap[certificate.icon];
              return (
                <Reveal
                  key={certificate.title}
                  delay={index * 0.04}
                  className="group rounded-lg border border-white/10 bg-white/[0.052] p-5 shadow-panel backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/35"
                >
                  <a href={certificate.href} target="_blank" rel="noreferrer" className="block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-black/30">
                      <Image
                        src={certificate.preview}
                        alt={`${certificate.title} preview`}
                        fill
                        sizes="(max-width: 768px) 92vw, 420px"
                        className="object-cover object-top transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <Icon className="mb-4 size-6 text-cyan-200" />
                        <h2 className="text-lg font-semibold text-white">{certificate.title}</h2>
                        <p className="mt-2 text-sm text-white/[0.56]">
                          {certificate.issuer} | {certificate.date}
                        </p>
                      </div>
                      <ExternalLink className="size-4 shrink-0 text-white/35 transition group-hover:text-cyan-100" />
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
