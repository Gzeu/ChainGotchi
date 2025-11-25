import { motion } from "framer-motion";
export default function LevelUpBadge() {
  return (
    <motion.div
      className="fixed top-10 left-1/2 z-50 -translate-x-1/2 bg-yellow-400 shadow-xl px-8 py-4 rounded-2xl border-4 border-amber-300 font-bold text-3xl text-yellow-900"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: [1.05, 0.95, 1] }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.7 }}
    >
      ⭐ LEVEL UP!
    </motion.div>
  );
}
