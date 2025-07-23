"use client";

import Image from "next/image";

type Props = {
  lettersGenerated: number;
};

export default function Hero({ lettersGenerated }: Props) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-4">
      <div className="flex flex-row items-center justify-center gap-3">
        <h1 className="text-6xl font-bold text-white">CoverMe</h1>
        <Image width={75} height={75} src="/logo.png" alt="CoverMe Logo" />
      </div>
      {lettersGenerated ? (
        <h2 className="text-2xl">
          You&apos;ve generated {lettersGenerated} cover letters so far. Keep it
          up!
        </h2>
      ) : (
        <h2 className="text-2xl">
          No cover letters generated. Let&apos;s get started!
        </h2>
      )}
      <p className="text-lg text-gray-400">
        An AI Cover Letter Generator by Craig Ondevilla
      </p>
    </div>
  );
}
