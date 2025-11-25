import React from "react";
import { PetCard, PetData } from "../components/PetCard";
import { useFeedPet, usePlayWithPet, useGetPetStats } from "../hooks/useChainGotchi";
import { safeAction } from "../lib/safeAction";

export function PetStatsCard({ tokenId }: { tokenId: number }) {
  const { data: pet, isLoading } = useGetPetStats(tokenId);
  const { writeAsync: feedAsync, isLoading: feedLoading } = useFeedPet();
  const { writeAsync: playAsync, isLoading: playLoading } = usePlayWithPet();

  if (!pet) return <div className="skeleton h-56 w-full" />;

  const handleFeed = () => safeAction(() => feedAsync({ args: [tokenId] }), "Pet fed!");
  const handlePlay = () => safeAction(() => playAsync({ args: [tokenId] }), "You played with your pet!");

  return (
    <PetCard
      pet={pet as PetData}
      onFeed={handleFeed}
      onPlay={handlePlay}
      loading={feedLoading || playLoading || isLoading}
    />
  );
}
