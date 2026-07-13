import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { iconMap } from "@/components/icon-map";
import { PageHeader, PageSection, Reveal } from "@/components/page-motion";
import { SocialDock } from "@/components/site-chrome";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  const MailIcon = iconMap.mail;
  const PhoneIcon = iconMap.phone;
  const MapIcon = iconMap.map;

  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <PageHeader
            eyebrow="Contact"
            title="Build something useful, intelligent, and well engineered."
            copy="Reach out for software engineering, AI development, full stack products, or collaborative technical work."
          />
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <Reveal className="glass rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white">{contact.name}</h2>
              <div className="mt-6 space-y-4">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/[0.72] transition hover:text-cyan-100">
                  <MailIcon className="size-5 text-cyan-200" />
                  {contact.email}
                </a>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/[0.72] transition hover:text-cyan-100">
                  <PhoneIcon className="size-5 text-cyan-200" />
                  {contact.phone}
                </a>
                <div className="flex items-center gap-3 text-white/[0.72]">
                  <MapIcon className="size-5 text-cyan-200" />
                  {contact.location}
                </div>
              </div>
              <div className="mt-8">
                <SocialDock />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
