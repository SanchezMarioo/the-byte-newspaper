import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://newspapercms.mariosanchez.store/api/articles?limit=0"
    );

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
