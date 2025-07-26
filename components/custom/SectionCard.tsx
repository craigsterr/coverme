// components/SectionCard.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function SectionCard({
  title,
  children,
  defaultOpen = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="text-white rounded-lg">
      <div
        className="flex items-center justify-between cursor-pointer rounded-lg p-2  transition-all duration-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-xl font-semibold ">{title}</h2>
        <span className="text-sm text-gray-400">{isOpen ? "▲" : "▼"}</span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mt-4"
          >
            <div className="h-[2px] bg-white/20 mb-4" />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
