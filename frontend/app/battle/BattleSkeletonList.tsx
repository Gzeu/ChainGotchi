import React from "react";
const SkeletonBattle = () => (
  <div className="animate-pulse rounded-lg border-2 border-indigo-100 p-4 bg-gray-100 dark:bg-zinc-900 mb-2">
    <div className="h-4 w-1/3 bg-gray-300 rounded mb-1" />
    <div className="h-4 w-2/5 bg-gray-300 rounded mb-1" />
    <div className="h-4 w-1/5 bg-gray-300 rounded" />
  </div>
);
export default function BattleSkeletonList() {
  return <>{[...Array(5)].map((_, i) => <SkeletonBattle key={i} />)}</>;
}
