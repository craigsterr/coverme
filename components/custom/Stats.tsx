import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import SectionCard from "./SectionCard";
type Props = {
  buttonStyle: string;
  sectionCard: string;
};
export default function Stats({ buttonStyle, sectionCard }: Props) {
  const [jobTally, setJobTally] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("job-tally");
    if (stored) setJobTally(parseInt(stored, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("job-tally", jobTally.toString());
  }, [jobTally]);
  return (
    <>
      <section className={`${sectionCard} bg-gray-900 text-white mt-8 `}>
        <SectionCard title="Statistics">
          {" "}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-between w-full sm:w-[75%] mx-auto">
            {" "}
            <motion.p
              key={jobTally}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-semibold"
            >
              {jobTally} jobs applied to
            </motion.p>
            <div className={"flex gap-2 justify-center"}>
              <button className={buttonStyle} onClick={() => setJobTally(0)}>
                🗑️ Clear
              </button>
              <button
                className={buttonStyle}
                onClick={() => setJobTally((count) => Math.max(count - 1, 0))}
              >
                -
              </button>
              <button
                className={buttonStyle}
                onClick={() => setJobTally((count) => count + 1)}
              >
                +
              </button>{" "}
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
