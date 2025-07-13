export const runtime = "nodejs";

import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import { Buffer } from "buffer";

export async function POST(req: Request) {
  console.log("POST /api/extractText route hit");
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const dataBuffer = Buffer.from(arrayBuffer);
    const data = await pdf(dataBuffer);

    return NextResponse.json({
      message: "PDF processed successfully",
      text: data.text,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}
