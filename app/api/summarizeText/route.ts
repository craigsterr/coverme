import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body.text as string;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 500 });
    }

    const openai = new OpenAI();
    openai.apiKey = process.env.OPENAI_API_KEY!;

    const response = await openai.responses.create({
      model: "gpt-4.1-nano",
      input: `Summarize this resume in 5–9 bullet points. Include:
            - Candidate’s name and title or current role
            - 3–5 core skills
            - 2–3 achievements or projects
            - Education (if listed)

            Use simple language. Be brief and token-efficient.

            Resume:
            ${text}`,
    });

    return NextResponse.json({
      message: "Text summarized successfully",
      text: response.output_text,
    });
  } catch (error) {
    console.error("Error summarizing text:", error);
    return NextResponse.json(
      { error: "Failed to summarize text" },
      { status: 500 }
    );
  }
}
