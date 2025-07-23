import { useState } from "react";

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
    </>
  );
}
