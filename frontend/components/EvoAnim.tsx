import { motion } from "framer-motion";
export default function EvoAnim({ stage }: { stage: number }) {
  const label = ["🥚", "👶", "🧒", "💪", "👑"][stage] ?? "?";
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3"
      initial={{ scale: 0.6, opacity: 0.5 }}
      animate={{ scale: 1.4, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.9, type: "spring", bounce: 0.5 }}
    >
      <div className="text-7xl">{label}</div>
      <div className="mt-1 font-bold text-indigo-800 text-lg">Evolution!</div>
    </motion.div>
  );
}
