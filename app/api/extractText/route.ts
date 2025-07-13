import pdf from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf");

    if (!file || !(file instanceof Blob)) {
      return new Response(JSON.stringify({ error: "No valid file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(buffer);

    return new Response(JSON.stringify({ text: data.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error parsing PDF:", err);
    return new Response(JSON.stringify({ error: "PDF parsing failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
