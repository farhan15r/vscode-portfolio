import config from "@/utils/config";
import axios from "axios";
import { NextResponse } from "next/server";

const { GITHUB_API_KEY, GITHUB_USERNAME, SHOWED_GITHUB_REPOS } = config;

export async function GET() {
  const res = await axios.get(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
    {
      headers: {
        Authorization: `token ${GITHUB_API_KEY}`,
      },
    }
  );
  let repos = res.data;

  repos = repos.filter((repo) => {
    return SHOWED_GITHUB_REPOS.includes(repo.html_url);
  });

  return NextResponse.json(repos);
}
