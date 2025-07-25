// components/AnimatedNumber.tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type Props = {
  number: number;
};

export default function AnimatedNumber({ number }: Props) {
  const count = useMotionValue(0);
  const spring = useSpring(count, {
    stiffness: 100,
    damping: 20,
  });

  const rounded = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    count.set(number);
  }, [number, count]);

  return <motion.span>{rounded.get()}</motion.span>;
}
