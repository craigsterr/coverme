"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  type Job = {
    title: string;
    description: string;
    company: string;
  };

  const [file, setFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string | null>(null);
  const [summarizedText, setSummarizedText] = useState<string | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [summarizeLoading, setSummarizeLoading] = useState(false);
  const [coverLetterLoading, setCoverLetterLoading] = useState<{
    [key: number]: boolean;
  }>({});
  const [coverLettersLoading, setCoverLettersLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobTitleInput, setJobTitleInput] = useState<string>("");
  const [jobDescriptionInput, setJobDescriptionInput] = useState<string>("");
  const [companyNameInput, setCompanyNameInput] = useState<string>("");

  const [coverLetters, setCoverLetters] = useState<{ [key: number]: string }>(
    {}
  );
  const [copyTexts, setCopyTexts] = useState<{ [key: number]: boolean }>({});

  const [addNew, setAddNew] = useState<boolean>(false);

  const buttonStyle =
    "px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const sectionCard =
    "w-full max-w-2xl bg-zinc-900 border border-stone-700 rounded-xl p-6 shadow";

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
  };

  const handleSubmitJob = () => {
    const trimmedTitle = jobTitleInput.trim();
    const trimmedDescription = jobDescriptionInput.trim();
    const trimmedCompany = companyNameInput.trim();
    if (trimmedDescription !== "") {
      setJobs((prev) => [
        ...prev,
        {
          title: trimmedTitle,
          description: trimmedDescription,
          company: trimmedCompany,
        },
      ]);
      setJobTitleInput("");
      setJobDescriptionInput("");
      setCompanyNameInput("");
    }

    setAddNew(true);
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
    if (!file) return alert("Please upload a resume first.");
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

  const handleGenerateCoverLetter = async (job: Job, index: number) => {
    if (!summarizedText) return alert("Please summarize your resume first.");

    setCoverLetterLoading((prev) => ({ ...prev, [index]: true }));

    const res = await fetch("/api/generateCoverLetter", {
      method: "POST",
      body: JSON.stringify({
        company: job.company,
        title: job.title,
        description: job.description,
        summary: summarizedText,
      }),
    });

    const data = await res.json();

    setCoverLetterLoading((prev) => ({ ...prev, [index]: false }));

    if (!res.ok) {
      setError("Failed to generate cover letter");
      setSummarizedText(null);
      return;
    }

    setCoverLetters((prev) => ({ ...prev, [index]: data.text || "" }));
  };

  const handleGenerateCoverLetters = async () => {
    if (jobs.length === 0) return alert("Please add a job first.");
    setCoverLettersLoading(true);

    const jobsToGenerate = jobs
      .map((job, index) => ({ job, index }))
      .filter(({ index }) => !coverLetters[index]); // Reliable indexing

    await Promise.all(
      jobsToGenerate.map(({ job, index }) =>
        handleGenerateCoverLetter(job, index)
      )
    );

    setCoverLettersLoading(false);
    setAddNew(false);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="py-20 px-4 bg-stone-950 text-white min-h-screen items-center flex flex-col">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="flex items-center">
          <h1 className="text-6xl font-bold text-white">CoverMe</h1>
          <Image
            width={75}
            height={75}
            src="/logo.png"
            alt="CoverMe Logo"
            className="mx-auto"
          />
        </div>
        <p className="text-lg text-gray-400">
          An AI Cover Letter Generator by Craig Ondevilla
        </p>
      </div>

      <section className={`${sectionCard} bg-gray-900 text-white mt-8`}>
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
        {file && (
          <p className="mt-2 text-gray-400 text-sm">Selected: {file.name}</p>
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
            <pre className="text-sm bg-gray-800 p-3 rounded max-h-60 overflow-y-auto">
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
          </div>
        )}
      </section>
      {summarizedText && (
        <section className={`${sectionCard} bg-gray-900 text-white mt-8`}>
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <p className="mb-4 text-green-600">
            Step 3: Paste a job description you’re applying to (from LinkedIn,
            Indeed, etc.).
          </p>
          <input
            type="text"
            value={jobTitleInput}
            onChange={(e) => setJobTitleInput(e.target.value)}
            placeholder="Job Title (Optional)"
            maxLength={100}
            className="w-full mb-2 p-2 border border-gray-700 bg-gray-800 rounded-md text-sm"
          />
          <input
            type="text"
            value={companyNameInput}
            onChange={(e) => setCompanyNameInput(e.target.value)}
            placeholder="Company Name (Optional)"
            maxLength={100}
            className="w-full mb-2 p-2 border border-gray-700 bg-gray-800 rounded-md text-sm"
          />
          <textarea
            value={jobDescriptionInput}
            onChange={(e) => setJobDescriptionInput(e.target.value)}
            placeholder="Paste full job description..."
            maxLength={4000}
            rows={6}
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded-md text-sm"
          />
          <p className="text-sm text-gray-400 mt-1">
            {jobDescriptionInput.length} / 4000 characters
          </p>
          <button onClick={handleSubmitJob} className={`${buttonStyle} mt-3`}>
            Add Job
          </button>
        </section>
      )}

      {jobs.length != 0 && (
        <section className={`${sectionCard} bg-gray-900 text-white mt-8`}>
          <h2 className="text-xl font-semibold mb-4">Generated Letters</h2>
          <p className="mb-4 text-green-600">
            Step 4: Generate cover letters for each job!
          </p>
          <button
            className={buttonStyle + "mb-4"}
            onClick={handleGenerateCoverLetters}
            disabled={coverLettersLoading || !addNew || !summarizedText}
          >
            {coverLettersLoading ? "Generating..." : "Generate Cover Letters"}
          </button>
          {jobs.map((job, i) => (
            <div
              key={i}
              className="border border-gray-700 rounded-lg p-4 mb-4 mt-4"
            >
              <h3 className="font-semibold mb-2 text-lg">
                {job.title || "Untitled Role"} @{" "}
                {job.company || "Unknown Company"}
              </h3>
              <pre className="text-sm p-3 rounded border border-gray-700 bg-gray-800 max-h-60 overflow-y-auto mb-2">
                {job.description}
              </pre>

              {coverLetterLoading[i] ? (
                <p className="text-gray-400">Generating cover letter...</p>
              ) : (
                <p className="text-gray-400">
                  {coverLetters[i]
                    ? "Cover letter generated!"
                    : "Click 'Generate Cover Letters' to create."}
                </p>
              )}
              {coverLetters[i] && (
                <>
                  <pre className="text-sm mt-4 p-3 rounded border border-gray-700 bg-gray-800 max-h-60 overflow-y-auto whitespace-pre-wrap">
                    {coverLetters[i]}
                  </pre>
                  <button
                    onClick={() => {
                      copyText(coverLetters[i]);
                      setCopyTexts((prev) => ({ ...prev, [i]: true }));
                    }}
                    className={`${buttonStyle} mt-2`}
                  >
                    {copyTexts[i] ? "Copied!" : "Copy to Clipboard"}
                  </button>
                </>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
