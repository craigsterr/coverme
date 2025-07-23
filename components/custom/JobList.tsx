import { useState } from "react";
import { jsPDF } from "jspdf";

type Job = {
  title: string;
  description: string;
  company: string;
};

type Props = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  summarizedText: string;
  setSummarizedText: (value: string | null) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
  setLettersGenerated: React.Dispatch<React.SetStateAction<number>>;
  buttonStyle: string;
  sectionCard: string;
};

export default function JobList({
  jobs,
  setJobs,
  setLettersGenerated,
  summarizedText,
  setSummarizedText,
  addNew,
  setAddNew,
  buttonStyle,
  sectionCard,
}: Props) {
  const [coverLetterLoading, setCoverLetterLoading] = useState<{
    [key: number]: boolean;
  }>({});
  const [coverLettersLoading, setCoverLettersLoading] =
    useState<boolean>(false);
  const [coverLetters, setCoverLetters] = useState<{ [key: number]: string }>(
    {}
  );
  const [copyTexts, setCopyTexts] = useState<{ [key: number]: boolean }>({});
  const [fullName, setFullName] = useState<string>("");

  const handleGenerateCoverLetter = async (job: Job, index: number) => {
    if (!summarizedText) return alert("Please summarize your resume first.");

    setCoverLetterLoading((prev) => ({ ...prev, [index]: true }));
    setLettersGenerated((num) => num + 1);
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

  const handleDownloadPDF = async (i: number, job: Job) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
    });

    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();

    // === Name Header ===
    const name = fullName;
    const nameFontSize = 24;

    doc.setFont("Times", "Normal");
    doc.setFontSize(nameFontSize);
    doc.text(name, margin, 60);

    // === Horizontal Line Underneath ===
    const lineY = 70;
    doc.setLineWidth(1);
    doc.line(margin, lineY, pageWidth - margin, lineY);

    // === Body Text ===
    const fontSize = 11;
    doc.setFont("Times", "Normal");
    doc.setFontSize(fontSize);

    const paragraphY = lineY + 30; // space below the line
    const textWidth = pageWidth - margin * 2;

    const lines = doc.splitTextToSize(coverLetters[i], textWidth);
    doc.text(lines, margin, paragraphY, {
      maxWidth: textWidth,
      lineHeightFactor: 1.6,
    });

    doc.save(`${job.title || "Untitled"}_${job.company || "Company"}.pdf`);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearJobs = () => {
    setJobs([]);
    setCoverLetters([]);
  };

  return (
    <>
      {jobs.length != 0 && (
        <section className={`${sectionCard} bg-gray-900 text-white mt-8`}>
          <div className="pb-5">
            <h2 className="text-xl font-semibold mb-4">Generated Letters</h2>
            <p className="mb-4 text-green-600">
              Step 4: Generate cover letters for each job!
            </p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name (for PDF download)"
              maxLength={100}
              className="w-full mb-4 p-2 border border-gray-700 bg-gray-800 rounded-md text-sm"
            />
            <div className="flex gap-5 sm:flex-row flex-col">
              <button
                className={buttonStyle + "mb-4"}
                onClick={handleGenerateCoverLetters}
                disabled={coverLettersLoading || !addNew || !summarizedText}
              >
                {coverLettersLoading
                  ? "Generating..."
                  : "Generate Cover Letters"}
              </button>
              <button className={buttonStyle + "mb-4"} onClick={clearJobs}>
                Clear All
              </button>
            </div>
          </div>
          <div className="max-h-[100vh] overflow-y-auto px-10 bg-stone-950 rounded-2xl">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="border border-gray-700 rounded-lg p-4 mb-4 mt-4"
              >
                <h3 className="font-semibold mb-2 text-lg">
                  {job.title || "Untitled Role"} @{" "}
                  {job.company || "Unknown Company"}
                </h3>
                <pre className="text-sm p-3 rounded border border-gray-700 bg-gray-800 max-h-60 overflow-y-auto mb-2 whitespace-pre-wrap">
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
                  <div className="flex flex-col">
                    <textarea
                      defaultValue={coverLetters[i]}
                      className="text-sm mt-4 p-3 rounded border border-gray-700 bg-gray-800 h-75 overflow-y-auto whitespace-pre-wrap"
                    ></textarea>
                    <div className="flex justify-center gap-5">
                      <button
                        onClick={() => {
                          copyText(coverLetters[i]);
                          setCopyTexts((prev) => ({ ...prev, [i]: true }));
                        }}
                        className={`${buttonStyle} mt-2`}
                      >
                        {copyTexts[i] ? "Copied!" : "Copy to Clipboard"}
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(i, job)}
                        className={`${buttonStyle} mt-2`}
                      >
                        {copyTexts[i] ? "Downloaded!" : "Download PDF"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
