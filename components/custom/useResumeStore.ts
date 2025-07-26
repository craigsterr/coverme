import { create } from "zustand";

type ResumeState = {
  summarizedText: string;
  setSummarizedText: (text: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
};

export const useResumeStore = create<ResumeState>((set) => ({
  summarizedText: "",
  setSummarizedText: (text) => set({ summarizedText: text }),
  fullName: "",
  setFullName: (name) => set({ fullName: name }),
}));

export const inputStyle =
  "w-[100%] sm:w-sm p-2 border border-stone-700 bg-stone-950 rounded-md text-sm outline-none";
export const textAreaStyle =
  "w-full p-3 border border-stone-700 bg-stone-950 rounded-md text-sm outline-none";
export const staticTextAreaStyle =
  "text-sm bg-stone-900 p-3 rounded max-h-60 overflow-y-auto whitespace-pre-wrap border border-white/20";
