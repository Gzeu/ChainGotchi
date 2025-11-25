import React from "react";
export const SkeletonCard: React.FC = () => (
  <div className="animate-pulse p-6 rounded-2xl shadow-lg bg-gray-200 dark:bg-zinc-800 h-72 w-full max-w-xs">
    <div className="h-6 w-1/3 bg-gray-300 rounded mb-3" />
    <div className="h-4 w-1/4 bg-gray-300 rounded mb-2" />
    <div className="h-4 w-2/3 bg-gray-300 rounded mb-4" />
    <div className="h-3 w-full bg-gray-300 rounded mb-2" />
    <div className="h-3 w-3/5 bg-gray-300 rounded mb-2" />
    <div className="h-3 w-4/5 bg-gray-300 rounded mb-2" />
    <div className="h-8 w-24 bg-gray-400 mx-auto rounded mt-4" />
  </div>
);
