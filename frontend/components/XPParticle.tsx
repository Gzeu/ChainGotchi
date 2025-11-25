import React from "react";
import { motion } from "framer-motion";
export default function XPParticle({ x, y }: { x: number, y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y }}
      animate={{ opacity: 1, scale: 1.3, y: y - 40 }}
      exit={{ opacity: 0, scale: 0.4, y: y - 100 }}
      transition={{ duration: 1 }}
      className="absolute left-0 top-0 pointer-events-none text-orange-500 font-extrabold text-lg"
      style={{ left: x, top: y }}
    >
      +XP
    </motion.div>
  );
}
