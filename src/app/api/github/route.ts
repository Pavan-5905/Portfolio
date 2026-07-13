import { NextResponse } from "next/server";

export const revalidate = 900;

const USERNAME = "Pavan-5905";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  default_branch: string;
};

type GitHubEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: Array<{ sha: string; message: string; url?: string }>;
  };
};

type GraphQLCalendar = {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      color: string;
      weekday: number;
    }>;
  }>;
};

const restHeaders: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "pavan-kumar-ketha-portfolio"
};

if (GITHUB_TOKEN) {
  restHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

async function rest<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: restHeaders,
    next: { revalidate }
  });

  if (!response.ok) {
    throw new Error(`GitHub REST ${path} failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  if (!GITHUB_TOKEN) return null;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "pavan-kumar-ketha-portfolio"
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate }
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as { data?: T; errors?: unknown };
  if (payload.errors || !payload.data) return null;
  return payload.data;
}

function compactRepository(repo: GitHubRepo) {
  return {
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    url: repo.html_url,
    archived: repo.archived
  };
}

function eventSummary(events: GitHubEvent[]) {
  const counts = new Map<string, number>();
  for (const event of events) {
    counts.set(event.type, (counts.get(event.type) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([type, count]) => ({ type: type.replace("Event", ""), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function fallbackContributionDays(events: GitHubEvent[]) {
  const counts = new Map<string, number>();
  for (const event of events) {
    const date = event.created_at.slice(0, 10);
    counts.set(date, (counts.get(date) || 0) + 1);
  }

  const days = [];
  const today = new Date();
  for (let offset = 139; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const key = date.toISOString().slice(0, 10);
    days.push({
      date: key,
      contributionCount: counts.get(key) || 0,
      color: counts.has(key) ? "#22d3ee" : "#172033"
    });
  }
  return days;
}

async function getGraphQLContributionData() {
  const base = await graphql<{
    user: {
      pinnedItems: {
        nodes: Array<{
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          forkCount: number;
          updatedAt: string;
          primaryLanguage: { name: string; color: string } | null;
        }>;
      };
      contributionsCollection: { contributionYears: number[] };
    } | null;
  }>(
    `
      query PortfolioGithubBase($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                updatedAt
                primaryLanguage { name color }
              }
            }
          }
          contributionsCollection {
            contributionYears
          }
        }
      }
    `,
    { login: USERNAME }
  );

  if (!base?.user) {
    return null;
  }

  const contributionYears = [...base.user.contributionsCollection.contributionYears].sort((a, b) => b - a);
  const calendars = await Promise.all(
    contributionYears.map(async (year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const toDate = year === new Date().getUTCFullYear() ? new Date() : new Date(Date.UTC(year, 11, 31, 23, 59, 59));
      const calendar = await graphql<{
        user: {
          contributionsCollection: {
            contributionCalendar: GraphQLCalendar;
          };
        } | null;
      }>(
        `
          query PortfolioGithubCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                      weekday
                    }
                  }
                }
              }
            }
          }
        `,
        { login: USERNAME, from, to: toDate.toISOString() }
      );

      return {
        year,
        calendar: calendar?.user?.contributionsCollection.contributionCalendar || null
      };
    })
  );

  return {
    pinnedRepositories: base.user.pinnedItems.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      updatedAt: repo.updatedAt,
      url: repo.url
    })),
    contributionYears,
    calendars: calendars.filter((entry) => entry.calendar)
  };
}

export async function GET() {
  try {
    const [profile, repos, events] = await Promise.all([
      rest<GitHubUser>(`/users/${USERNAME}`),
      rest<GitHubRepo[]>(`/users/${USERNAME}/repos?per_page=100&sort=updated`),
      rest<GitHubEvent[]>(`/users/${USERNAME}/events/public?per_page=100`)
    ]);

    const originalRepos = repos.filter((repo) => !repo.fork);
    const totalStars = originalRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const languageResponses = await Promise.all(
      originalRepos.slice(0, 14).map(async (repo) => {
        try {
          return await rest<Record<string, number>>(`/repos/${USERNAME}/${repo.name}/languages`);
        } catch {
          return {};
        }
      })
    );

    const languages = new Map<string, number>();
    for (const response of languageResponses) {
      for (const [language, bytes] of Object.entries(response)) {
        languages.set(language, (languages.get(language) || 0) + bytes);
      }
    }

    const languageTotals = Array.from(languages.entries())
      .map(([name, bytes]) => ({ name, bytes }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8);

    const recentCommits = events
      .filter((event) => event.type === "PushEvent" && event.payload?.commits?.length)
      .flatMap((event) =>
        (event.payload?.commits || []).map((commit) => ({
          repo: event.repo.name.replace(`${USERNAME}/`, ""),
          sha: commit.sha,
          message: commit.message,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          date: event.created_at
        }))
      )
      .slice(0, 8);

    const graphQL = await getGraphQLContributionData();
    const fallbackYears = Array.from(
      new Set(
        originalRepos.flatMap((repo) => [
          new Date(repo.created_at).getUTCFullYear(),
          new Date(repo.pushed_at).getUTCFullYear()
        ])
      )
    ).sort((a, b) => b - a);

    return NextResponse.json({
      profile: {
        login: profile.login,
        name: profile.name,
        avatarUrl: profile.avatar_url,
        url: profile.html_url,
        bio: profile.bio,
        location: profile.location,
        followers: profile.followers,
        following: profile.following,
        repositories: profile.public_repos
      },
      stats: {
        followers: profile.followers,
        following: profile.following,
        repositories: profile.public_repos,
        stars: totalStars
      },
      contributionYears: graphQL?.contributionYears?.length ? graphQL.contributionYears : fallbackYears,
      contributionCalendars: graphQL?.calendars || [],
      fallbackContributionDays: fallbackContributionDays(events),
      pinnedRepositories:
        graphQL?.pinnedRepositories?.length
          ? graphQL.pinnedRepositories
          : originalRepos
              .slice()
              .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at))
              .slice(0, 6)
              .map(compactRepository),
      activityOverview: eventSummary(events),
      languages: languageTotals,
      recentCommits,
      repositories: originalRepos.slice(0, 24).map(compactRepository),
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load GitHub data"
      },
      { status: 502 }
    );
  }
}
