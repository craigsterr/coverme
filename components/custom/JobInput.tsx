import { useState } from "react";
import SectionCard from "./SectionCard";
import { inputStyle, textAreaStyle } from "@/components/custom/useResumeStore";

type Job = {
  title: string;
  description: string;
  company: string;
};

type Props = {
  setAddNew: (value: boolean) => void;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  summarizedText: string;
  buttonStyle: string;
  sectionCard: string;
};

export default function JobInput({
  setAddNew,
  setJobs,
  summarizedText,
  buttonStyle,
  sectionCard,
}: Props) {
  const [jobTitleInput, setJobTitleInput] = useState<string>("");
  const [jobDescriptionInput, setJobDescriptionInput] = useState<string>("");
  const [companyNameInput, setCompanyNameInput] = useState<string>("");

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

  return (
    <>
      {summarizedText && (
        <section
          id="add-job"
          className={`${sectionCard} bg-gray-900 text-white mt-8`}
        >
          <SectionCard title="Job Description">
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
              className={inputStyle + " mb-2"}
            />
            <input
              type="text"
              value={companyNameInput}
              onChange={(e) => setCompanyNameInput(e.target.value)}
              placeholder="Company Name (Optional)"
              maxLength={100}
              className={inputStyle + " mb-2"}
            />
            <textarea
              value={jobDescriptionInput}
              onChange={(e) => setJobDescriptionInput(e.target.value)}
              placeholder="Paste full job description..."
              maxLength={4000}
              rows={6}
              className={textAreaStyle}
            />
            <p className="text-sm text-gray-400 mt-1">
              {jobDescriptionInput.length} / 4000 characters
            </p>
            <button onClick={handleSubmitJob} className={`${buttonStyle} mt-3`}>
              Add Job
            </button>
            {/* <p className="my-10 font-bold text-2xl">OR</p>
            <p className="text-green-600 mb-4">
              Step 3: Paste a job link (Indeed)
            </p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={jobLinkInput}
                onChange={(e) => setJobLinkInput(e.target.value)}
                placeholder="https://www.indeed.com/viewjob..."
                maxLength={300}
                className={inputStyle + " flex-1"}
              />
              <button onClick={handleFetchFromLink} className={buttonStyle}>
                Fetch
              </button>
            </div> */}
          </SectionCard>
        </section>
      )}
    </>
  );
}
