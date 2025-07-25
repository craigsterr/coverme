import { useState } from "react";
import { jsPDF } from "jspdf";
import SectionCard from "./SectionCard";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useResumeStore } from "@/components/custom/useResumeStore";

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
  const { fullName } = useResumeStore();

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

    fireConfetti();

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

  const fireConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <>
      {jobs.length != 0 && (
        <section
          id="jobs"
          className={`${sectionCard} bg-gray-900 text-white mt-8`}
        >
          <SectionCard title="Generated Letters">
            <div className="pb-5">
              <p className="mb-4 text-green-600">
                Step 4: Generate cover letters for each job!
              </p>
              <div className="flex gap-5 sm:flex-row flex-col">
                <button
                  className={buttonStyle + " mb-4 flex items-center gap-2"}
                  onClick={handleGenerateCoverLetters}
                  disabled={coverLettersLoading || !addNew || !summarizedText}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  {coverLettersLoading
                    ? "Generating..."
                    : "Generate Cover Letters"}
                </button>
                <button className={buttonStyle + " mb-4"} onClick={clearJobs}>
                  Clear All
                </button>
              </div>
            </div>

            <div className=" scrollbar-always max-h-[100vh] overflow-y-auto px-10 bg-stone-950 rounded-2xl ">
              {jobs.map((job, i) => (
                <div
                  key={i}
                  className="border border-gray-700 bg-gray-900 rounded-lg p-4 mb-4 mt-4 transition-all duration-100 hover:scale-101 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_#000000]"
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
                      <div className="flex flex-col sm:flex-row justify-center sm:gap-5">
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
          </SectionCard>
        </section>
      )}
    </>
  );
}
