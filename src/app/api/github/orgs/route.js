import config from "@/utils/config";
import axios from "axios";
import { NextResponse } from "next/server";

const { GITHUB_API_KEY, GITHUB_USERNAME } = config;

export async function GET() {
  const res = await axios.get(
    `https://api.github.com/users/${GITHUB_USERNAME}/orgs`,
    {
      headers: {
        Authorization: `token ${GITHUB_API_KEY}`,
      },
    }
  );

  return NextResponse.json(res.data);
}
