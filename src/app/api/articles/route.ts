import { NextResponse } from "next/server";

const CMS_BASE_URL =
  process.env.CMS_BASE_URL ?? "https://newspapercms.mariosanchez.store/api";
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;
const CMS_API_KEY = process.env.CMS_API_KEY;

const buildCmsHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "User-Agent": "the-byte-newspaper/1.0",
  };

  if (CMS_API_TOKEN) {
    headers.Authorization = `Bearer ${CMS_API_TOKEN}`;
  }

  if (CMS_API_KEY && !CMS_API_TOKEN) {
    headers.Authorization = `Bearer ${CMS_API_KEY}`;
  }

  return headers;
};

export async function GET() {
  try {
    const response = await fetch(`${CMS_BASE_URL}/articles?limit=0`, {
      headers: buildCmsHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
