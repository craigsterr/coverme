import { useState, useEffect } from "react";

type Props = {
  summarizedText: string;
  setSummarizedText: (value: string | null) => void;
  buttonStyle: string;
  sectionCard: string;
};

export default function Resume({
  summarizedText,
  setSummarizedText,
  buttonStyle,
  sectionCard,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [resumeLoading, setResumeLoading] = useState(false);
  const [parsedText, setParsedText] = useState<string | null>(null);
  const [summarizeLoading, setSummarizeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [specifications, setSpecifications] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setParsedText(null);
    setError(null);
    setFileName(selectedFile?.name || "");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    setResumeLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/extractText", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setResumeLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to parse PDF");
      setParsedText(null);
      return;
    }

    const parsed = data.text || "";
    if (parsed.length > 8000) {
      setError("Parsed text exceeds 8000 characters limit");
      setParsedText(null);
      return;
    }

    setParsedText(parsed.trim() || "");
  };

  const handleSummarizeText = async () => {
    if (!parsedText) return alert("Please choose a resume first.");
    setSummarizeLoading(true);

    const res = await fetch("/api/summarizeText", {
      method: "POST",
      body: JSON.stringify({ text: parsedText }),
    });

    const data = await res.json();

    setSummarizeLoading(false);

    if (!res.ok) {
      setError("Failed to summarize resume text");
      setSummarizedText(null);
      return;
    }

    setSummarizedText(data.text || "");
  };

  useEffect(() => {
    const saveParsedText = localStorage.getItem("parsed-text");
    if (saveParsedText) setParsedText(saveParsedText);

    const saveFileName = localStorage.getItem("file-name");
    if (saveFileName) setFileName(saveFileName);

    const saveSummary = localStorage.getItem("summary");
    if (saveSummary) setSummarizedText(saveSummary);

    // const saveSpecifications = localStorage.getItem("specifications");
    // if (saveSpecifications) setSpecifications(saveSpecifications);
  }, []);

  useEffect(() => {
    localStorage.setItem("file-name", fileName || "");
    localStorage.setItem("parsed-text", parsedText || "");
    localStorage.setItem("summary", summarizedText || "");
    // localStorage.setItem("specifications", specifications || "");
  }, [fileName, parsedText, summarizedText]);

  return (
    <section
      id="upload"
      className={`${sectionCard} bg-gray-900 text-white mt-8`}
    >
      <h2 className="text-xl font-semibold mb-4">Resume Upload</h2>
      <label className="block mb-2 font-medium text-green-600 highlight">
        Step 1: Upload your resume! (PDF format only)
      </label>
      <label className="inline-block cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md font-medium">
        Choose File
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {(file || parsedText) && (
        <p className="mt-2 text-gray-400 text-sm">Selected: {fileName || ""}</p>
      )}
      <div className="mt-4 flex gap-4">
        <button
          disabled={resumeLoading || !file}
          onClick={handleUpload}
          className={buttonStyle}
        >
          {resumeLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {parsedText && (
        <div className="mt-4 mb-4">
          <h3 className="font-semibold mb-2">Parsed Resume Text</h3>
          <pre className="text-sm bg-gray-800 p-3 rounded max-h-60 overflow-y-auto whitespace-pre-wrap">
            {parsedText}
          </pre>
          <p className="text-sm text-gray-400 mt-1">
            Length: {parsedText.length} characters
          </p>
        </div>
      )}
      {parsedText && (
        <>
          <p className="mb-4 text-green-600">
            Step 2: Summarize your resume with AI!
          </p>
          <button
            disabled={summarizeLoading}
            onClick={handleSummarizeText}
            className={buttonStyle}
          >
            {summarizeLoading ? "Summarizing..." : "Summarize Resume"}
          </button>
        </>
      )}
      {summarizedText && (
        <div className="mt-4">
          <h3 className="font-semibold">Resume Summary</h3>
          <p className="mb-2 italic text-gray-400">(Edit if needed)</p>
          <textarea
            value={summarizedText}
            onChange={(e) => setSummarizedText(e.target.value)}
            maxLength={1000}
            rows={6}
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-sm"
          />
          <p className="text-sm text-gray-400 mt-1">
            {summarizedText.length} / 1000 characters
          </p>
          {/* <textarea
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
            placeholder="Specifications (Optional)"
            maxLength={500}
            rows={3}
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md text-sm"
          />
          <p className="text-sm text-gray-400 mt-1">
            {specifications.length} / 250 characters
          </p> */}
        </div>
      )}
    </section>
  );
}
