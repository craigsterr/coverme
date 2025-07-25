import { useState, useEffect } from "react";
import SectionCard from "./SectionCard";
import { motion, AnimatePresence } from "framer-motion";
type Props = {
  buttonStyle: string;
  sectionCard: string;
  lettersGenerated: number;
};
export default function Stats({
  buttonStyle,
  sectionCard,
  lettersGenerated,
}: Props) {
  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastLoginTime, setLastLoginTime] = useState(0);
  const [dailyJobs, setDailyJobs] = useState(0);
  const [weeklyJobs, setWeeklyJobs] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [dailyGoalInput, setDailyGoalInput] = useState(10);
  const [weeklyGoal, setWeeklyGoal] = useState(70);
  const [weeklyGoalInput, setWeeklyGoalInput] = useState(70);

  function formatTimeAgo(timestamp: number) {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days === 1 ? "" : "s"} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    return "just now";
  }

  function formatMinutesToTime(minutes: number): string {
    const weeks = Math.floor(minutes / (60 * 24 * 7));
    const days = Math.floor((minutes % (60 * 24 * 7)) / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const remainingMinutes = minutes % 60;

    const parts = [];
    if (weeks > 0) parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (remainingMinutes > 0)
      parts.push(
        `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
      );

    return parts.length > 0 ? parts.join(", ") : "less than a minute";
  }

  useEffect(() => {
    const currentLogin = Date.now();
    const previousLogin = parseInt(
      localStorage.getItem("last-login") || "0",
      10
    );
    const previousStreak = parseInt(
      localStorage.getItem("daily-streak") || "0",
      10
    );

    const ONE_DAY = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((currentLogin - previousLogin) / ONE_DAY);

    if (daysPassed === 1) {
      setDailyStreak(previousStreak + 1);
      localStorage.setItem("daily-streak", (previousStreak + 1).toString());
    } else if (daysPassed > 1 || isNaN(previousLogin)) {
      setDailyStreak(1);
      localStorage.setItem("daily-streak", "1");
    } else {
      setDailyStreak(previousStreak);
    }

    setLastLoginTime(previousLogin);
    localStorage.setItem("last-login", currentLogin.toString());

    const storedDailyJobs = parseInt(
      localStorage.getItem("daily-jobs") || "0",
      10
    );
    const storedWeeklyJobs = parseInt(
      localStorage.getItem("weekly-jobs") || "0",
      10
    );

    setDailyJobs(storedDailyJobs);
    setWeeklyJobs(storedWeeklyJobs);
  }, []);

  useEffect(() => {
    localStorage.setItem("daily-jobs", dailyJobs.toString());
    localStorage.setItem("weekly-jobs", weeklyJobs.toString());
  }, [dailyJobs, weeklyJobs]);

  return (
    <>
      <section className={`${sectionCard} bg-gray-900 text-white mt-8 `}>
        <SectionCard title="Statistics">
          <div className="space-y-3 mb-4">
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center">
                <p>Today's goal: </p>
                <input
                  type="text"
                  value={dailyGoalInput}
                  onChange={(e) => setDailyGoalInput(parseInt(e.target.value))}
                  placeholder="Job Title (Optional)"
                  maxLength={100}
                  className="p-1 border border-gray-700 bg-gray-800 rounded-md w-15"
                />
                <button
                  className={buttonStyle}
                  onClick={() => setDailyGoal(dailyGoalInput)}
                >
                  Submit
                </button>
              </div>
              <div className="flex gap-2 items-center mb-4">
                <p>Weekly goal: </p>
                <input
                  type="text"
                  value={weeklyGoalInput}
                  onChange={(e) => setWeeklyGoalInput(parseInt(e.target.value))}
                  placeholder="Job Title (Optional)"
                  maxLength={100}
                  className="p-1 border border-gray-700 bg-gray-800 rounded-md w-15"
                />
                <button
                  className={buttonStyle}
                  onClick={() => setWeeklyGoal(weeklyGoalInput)}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="h-[1px] bg-white/20 mb-4" />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-between w-full">
              {" "}
              <div className="flex gap-2">
                ☀️
                <AnimatePresence mode="wait">
                  <motion.p
                    key={dailyJobs} // triggers animation on count change
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-semibold"
                  >
                    <span
                      className={
                        dailyJobs < dailyGoal / 2
                          ? "text-red-400"
                          : dailyJobs >= dailyGoal
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {dailyJobs}/{dailyGoal}{" "}
                    </span>
                  </motion.p>
                </AnimatePresence>
                <span>jobs applied for today</span>
              </div>
              <div className={"flex gap-2 justify-center"}>
                <button
                  className={buttonStyle}
                  onClick={() => {
                    setDailyJobs(0);
                    setWeeklyJobs(0);
                  }}
                >
                  🗑️ Clear
                </button>
                <button
                  className={buttonStyle}
                  onClick={() => {
                    setDailyJobs((count) => Math.max(count - 1, 0));
                    setWeeklyJobs((count) => Math.max(count - 1, 0));
                  }}
                >
                  -
                </button>
                <button
                  className={buttonStyle}
                  onClick={() => {
                    setDailyJobs((count) => count + 1);
                    setWeeklyJobs((count) => Math.max(count + 1, 0));
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-between w-full">
              <div>
                <div className="flex gap-2">
                  🗓️
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={dailyJobs} // triggers animation on count change
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg font-semibold"
                    >
                      <span
                        className={
                          weeklyJobs < weeklyGoal / 2
                            ? "text-red-400"
                            : weeklyJobs >= weeklyGoal
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {weeklyJobs}/{weeklyGoal}{" "}
                      </span>
                    </motion.p>
                  </AnimatePresence>
                  <span>jobs applied for this week</span>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-white/20 mb-4" />
            <p>
              📩{" "}
              <span className="font-bold text-green-300">
                {lettersGenerated}
              </span>{" "}
              cover letters generated
            </p>{" "}
            <div className="h-[1px] bg-white/20 mb-4" />
            <p>
              ⏳{" "}
              <span className="font-bold text-green-300">
                {formatMinutesToTime(lettersGenerated * 15)}
              </span>{" "}
              saved
            </p>
            <div className="h-[1px] bg-white/20 mb-4" />
            <p>
              🔥 <span className="font-bold text-green-300">{dailyStreak}</span>{" "}
              day streak. Keep it up!
            </p>
            <div className="h-[1px] bg-white/20 mb-4" />
            <p>
              🕒 Last login:{" "}
              <span className="font-bold text-green-300">
                {lastLoginTime ? formatTimeAgo(lastLoginTime) : "unknown"}
              </span>
            </p>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
