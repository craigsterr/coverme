import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = body.company as string;
    const title = body.title as string;
    const description = body.description as string;
    const summary = body.summary as string;

    if (!summary) {
      return NextResponse.json(
        { error: "No summary provided" },
        { status: 500 }
      );
    }
    if (!description) {
      return NextResponse.json(
        { error: "No job description provided" },
        { status: 500 }
      );
    }

    const openai = new OpenAI();
    openai.apiKey = process.env.OPENAI_API_KEY!;

    const prompt = `Write a concise cover letter starting with "Dear Hiring Manager," without including name, address, or contact info. Use a warm, confident tone. Keep it between 200-300 words. Include only the letter body and a simple closing line: "Sincerely, [Candidate Name]". Avoid generic phrases and clichés. The letter should feel genuine, confident, and personable, with a clear connection to the company and role.

    Write sentences under 15 words, with up to 3 sentences per paragraph unless needed.
    Avoid very niche vocabulary unless in the source. Do not use C2-level Cambridge English words.
    Keep the text easy to read at about an 8th-grade level (Flesch score ~70).
    Be direct and concise, including only necessary details.
    Minimize overusing “it” by naming the subject or using synonyms.
    Limit sections to 3 paragraphs or 300 words; create subsections if longer.

    Candidate Summary:
    ${summary}

    Job Description:
    ${description}
    ${company ? `\nCompany: ${company}` : ""}
    ${title ? `\nTitle: ${title}` : ""}
    `;

    const response = await openai.responses.create({
      model: "gpt-4.1-nano",
      input: prompt,
    });

    return NextResponse.json({
      message: "Cover letter generated successfully",
      text: response.output_text,
    });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
