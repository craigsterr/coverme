import { load } from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const url = body.url as string;

  if (!url) {
    return NextResponse.json({ error: "Missing link" }, { status: 500 });
  }
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    const description = $("#jobPost").text().trim();

    return NextResponse.json({
      message: "Cover letter generated successfully",
      text: description,
    });
  } catch (error) {
    console.error("Error scraping job description:", error);
    return NextResponse.json(
      { error: "Failed to scrape job description" },
      { status: 500 }
    );
  } finally {
  }
}
