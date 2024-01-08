import { NextResponse } from "next/server";
import data from "./projects.json";

export async function GET() {
  return NextResponse.json(data);
}
