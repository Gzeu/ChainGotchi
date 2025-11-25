import React from "react";
import { SkeletonCard } from "../components/SkeletonCard";

export default function PetsLoadingSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
