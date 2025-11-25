// Usage: <LoadingBar />
import React from "react";
export const LoadingBar: React.FC<{ percent: number }> = ({ percent }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 animate-pulse overflow-hidden">
    <div
      className="bg-indigo-400 h-4 rounded-full transition-all"
      style={{ width: `${percent}%` }}
    />
  </div>
);
