"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, GitFork, Github, Star } from "lucide-react";

import { PageHeader, Reveal } from "@/components/page-motion";
import { Button } from "@/components/ui/button";

type Repository = {
  name: string;
  description: string | null;
  language: string | null;
  languageColor?: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
};

type ContributionCalendar = {
  year: number;
  calendar: {
    totalContributions: number;
    weeks: Array<{
      contributionDays: Array<{
        date: string;
        contributionCount: number;
        color: string;
      }>;
    }>;
  };
};

type GitHubData = {
  profile: {
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
    bio: string | null;
    location: string | null;
    followers: number;
    following: number;
    repositories: number;
  };
  stats: {
    followers: number;
    following: number;
    repositories: number;
    stars: number;
  };
  contributionYears: number[];
  contributionCalendars: ContributionCalendar[];
  fallbackContributionDays: Array<{ date: string; contributionCount: number; color: string }>;
  pinnedRepositories: Repository[];
  activityOverview: Array<{ type: string; count: number }>;
  languages: Array<{ name: string; bytes: number }>;
  recentCommits: Array<{ repo: string; sha: string; message: string; url: string; date: string }>;
  repositories: Repository[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: value > 9999 ? "compact" : "standard" }).format(value);
}

function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="group rounded-lg border border-white/10 bg-white/[0.052] p-5 shadow-panel backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/35"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">{repo.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/[0.58]">
            {repo.description || "Public GitHub repository"}
          </p>
        </div>
        <ExternalLink className="size-4 shrink-0 text-white/40 transition group-hover:text-cyan-100" />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/[0.54]">
        {repo.language ? <span>{repo.language}</span> : null}
        <span className="flex items-center gap-1">
          <Star className="size-3.5" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="size-3.5" />
          {repo.forks}
        </span>
        <span>{formatDate(repo.updatedAt)}</span>
      </div>
    </a>
  );
}

function Heatmap({ data }: { data: GitHubData }) {
  if (data.contributionCalendars.length) {
    return (
      <div className="space-y-6">
        {data.contributionCalendars.map((entry) => (
          <div key={entry.year} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">{entry.year}</h3>
              <span className="text-sm text-white/[0.54]">
                {formatNumber(entry.calendar.totalContributions)} contributions
              </span>
            </div>
            <div className="overflow-x-auto pb-1">
              <div className="flex min-w-max gap-1">
                {entry.calendar.weeks.map((week, weekIndex) => (
                  <div key={`${entry.year}-${weekIndex}`} className="flex flex-col gap-1">
                    {week.contributionDays.map((day) => (
                      <span
                        key={day.date}
                        title={`${day.date}: ${day.contributionCount}`}
                        className="size-2.5 rounded-[2px] border border-white/[0.04]"
                        style={{ backgroundColor: day.color }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
        {data.fallbackContributionDays.map((day) => (
          <span
            key={day.date}
            title={`${day.date}: ${day.contributionCount}`}
            className="aspect-square rounded-[2px] border border-white/[0.04]"
            style={{ backgroundColor: day.color }}
          />
        ))}
      </div>
    </div>
  );
}

export function GitHubDashboard() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/github")
      .then((response) => {
        if (!response.ok) throw new Error("GitHub data unavailable");
        return response.json() as Promise<GitHubData>;
      })
      .then((payload) => {
        if (mounted) setData(payload);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "GitHub data unavailable");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const languageTotal = useMemo(
    () => data?.languages.reduce((sum, language) => sum + language.bytes, 0) || 1,
    [data]
  );

  if (error) {
    return (
      <div className="rounded-lg border border-red-300/20 bg-red-400/10 p-6 text-red-100">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-lg border border-white/10 bg-white/[0.05]" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="GitHub Profile"
        title={data.profile.name || data.profile.login}
        copy={data.profile.bio || "Public GitHub activity, repositories, languages, and contribution overview."}
      />

      <Reveal className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative size-20 overflow-hidden rounded-lg border border-white/10">
              <Image src={data.profile.avatarUrl} alt={data.profile.login} fill sizes="80px" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{data.profile.login}</h2>
              <p className="mt-1 text-sm text-white/[0.54]">{data.profile.location || "GitHub"}</p>
            </div>
          </div>
          <Button asChild className="mt-6 w-full" variant="secondary">
            <a href={data.profile.url} target="_blank" rel="noreferrer">
              <Github />
              Open GitHub
            </a>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Followers", data.stats.followers],
            ["Following", data.stats.following],
            ["Repositories", data.stats.repositories],
            ["Stars", data.stats.stars]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.052] p-5 shadow-panel backdrop-blur-xl">
              <div className="text-2xl font-semibold text-white">{formatNumber(Number(value))}</div>
              <div className="mt-1 text-sm text-white/[0.54]">{label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Contribution Years</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.contributionYears.map((year) => (
              <span key={year} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-white/[0.66]">
                {year}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Activity Overview</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {data.activityOverview.map((item) => (
              <div key={item.type} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <span className="text-white/[0.68]">{item.type}</span>
                <span className="font-semibold text-cyan-100">{item.count}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-10 rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Contribution Heatmap</h2>
        <div className="mt-5">
          <Heatmap data={data} />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Pinned Repositories</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {data.pinnedRepositories.map((repo) => (
              <RepositoryCard key={repo.url} repo={repo} />
            ))}
          </div>
        </Reveal>
        <Reveal className="rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Languages Used</h2>
          <div className="mt-5 space-y-4">
            {data.languages.map((language) => {
              const width = Math.max(8, Math.round((language.bytes / languageTotal) * 100));
              return (
                <div key={language.name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/[0.72]">{language.name}</span>
                    <span className="text-white/[0.48]">{width}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-cyan-300" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-10 rounded-lg border border-white/10 bg-white/[0.052] p-6 shadow-panel backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Recent Commits</h2>
        <div className="mt-5 grid gap-3">
          {data.recentCommits.length ? (
            data.recentCommits.map((commit) => (
              <a
                key={`${commit.repo}-${commit.sha}`}
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/35"
              >
                <div className="text-sm text-cyan-100">{commit.repo}</div>
                <div className="mt-1 text-white">{commit.message.split("\n")[0]}</div>
                <div className="mt-2 text-xs text-white/[0.45]">{formatDate(commit.date)}</div>
              </a>
            ))
          ) : (
            <p className="text-white/[0.58]">Recent public commits are not available from the public event feed.</p>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <h2 className="mb-5 text-xl font-semibold text-white">Repository Cards</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.repositories.map((repo) => (
            <RepositoryCard key={repo.url} repo={repo} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
