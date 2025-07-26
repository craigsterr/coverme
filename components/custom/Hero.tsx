"use client";
import Image from "next/image";
type Props = {
  lettersGenerated: number;
  buttonStyle: string;
};

export default function Hero({ lettersGenerated }: Props) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-4 w-full">
      <div className="flex flex-row items-center justify-center gap-3">
        <h1 className="text-5xl sm:text-6xl font-bold text-white select-none">
          CoverMe
        </h1>
        <Image
          width={75}
          height={75}
          src="/logo.png"
          alt="CoverMe Logo"
          className="select-none"
        />
      </div>
      <h2 className="text-2xl text-purple-600">
        {lettersGenerated
          ? `You've generated ${lettersGenerated} cover letters so far. Keep it up!`
          : "No cover letters generated. Let's get started!"}
      </h2>
      <p className="text-lg text-gray-400">
        An AI Cover Letter Generator by Craig Ondevilla
      </p>

      {/* <div className="relative overflow-hidden border border-white/20 shadow-xl py-4 rounded-xl bg-gradient-to-br from-white/15 via-white/5 to-white/10 backdrop-blur-md">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="mx-3 inline-block -skew-x-12 text-lg font-black text-white lg:text-2xl"
            >
              {lettersGenerated
                ? `You've generated ${lettersGenerated} cover letters so far.
              Keep it up!`
                : "No cover letters generated. Let's get started!"}
            </span>
          ))}
        </div>
      </div> */}
    </div>
  );
}
