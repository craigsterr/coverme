"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import Hero from "@/components/custom/Hero";
import Resume from "@/components/custom/Resume";
import JobInput from "@/components/custom/JobInput";
import JobList from "@/components/custom/JobList";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import Stats from "@/components/custom/Stats";
import "animate.css";

export default function Home() {
  type Job = {
    title: string;
    description: string;
    company: string;
  };

  const [lettersGenerated, setLettersGenerated] = useState<number>(0);
  const [summarizedText, setSummarizedText] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [addNew, setAddNew] = useState<boolean>(false);

  const buttonStyle =
    "px-3 py-1 text-white rounded-md hover:bg-sky-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl border border-white/20 bg-gradient-to-br from-white/20 via-white/5 to-white/10 cursor-pointer hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 hover:shadow-[4px_4px_0px_#000000] active:shadow-none transition duration-100 mx-1 border-2";
  const sectionCard =
    "w-full max-w-3xl bg-zinc-900 border border-2 border-stone-700 rounded-xl p-6 shadow ";

  useEffect(() => {
    const savedLettersGenerated = localStorage.getItem("letters-generated");
    if (savedLettersGenerated)
      setLettersGenerated(parseInt(savedLettersGenerated));
  }, []);

  useEffect(() => {
    localStorage.setItem("letters-generated", lettersGenerated.toString());
  }, [lettersGenerated]);

  return (
    <>
      <Analytics />
      <div className="flex justify-center">
        <NavBar />
      </div>

      <div className="mb-15"></div>
      <main className="py-20 px-4 bg-stone-950 text-white min-h-screen items-center flex flex-col">
        <Hero lettersGenerated={lettersGenerated} buttonStyle={buttonStyle} />
        <Resume
          summarizedText={summarizedText ?? ""}
          setSummarizedText={setSummarizedText}
          buttonStyle={buttonStyle}
          sectionCard={sectionCard}
        />
        <JobInput
          setAddNew={setAddNew}
          setJobs={setJobs}
          summarizedText={summarizedText ?? ""}
          buttonStyle={buttonStyle}
          sectionCard={sectionCard}
        />
        <JobList
          jobs={jobs}
          setJobs={setJobs}
          setLettersGenerated={setLettersGenerated}
          summarizedText={summarizedText ?? ""}
          setSummarizedText={setSummarizedText}
          addNew={addNew}
          setAddNew={setAddNew}
          buttonStyle={buttonStyle}
          sectionCard={sectionCard}
        />
        <Stats
          buttonStyle={buttonStyle}
          sectionCard={sectionCard}
          lettersGenerated={lettersGenerated}
        />
      </main>
      <Footer />
    </>
  );
}
