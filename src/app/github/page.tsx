import type { Metadata } from "next";

import { GitHubDashboard } from "@/components/github-dashboard";
import { PageSection } from "@/components/page-motion";

export const metadata: Metadata = {
  title: "GitHub"
};

export default function GitHubPage() {
  return (
    <main className="relative z-10">
      <PageSection className="pt-32">
        <div className="container">
          <GitHubDashboard />
        </div>
      </PageSection>
    </main>
  );
}
