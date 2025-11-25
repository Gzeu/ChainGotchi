import React from "react";
import { PetCard, PetData } from "../components/PetCard";
import { useFeedPet, usePlayWithPet, useGetPetStats } from "../hooks/useChainGotchi";

export function PetStatsCard({ tokenId }: { tokenId: number }) {
  const { data: pet, isLoading } = useGetPetStats(tokenId);
  const { write: feed, isLoading: feedLoading } = useFeedPet();
  const { write: play, isLoading: playLoading } = usePlayWithPet();

  if (!pet) return <div className="skeleton h-56 w-full" />;

  const handleFeed = () => feed({ args: [tokenId] });
  const handlePlay = () => play({ args: [tokenId] });

  return (
    <PetCard
      pet={pet as PetData}
      onFeed={handleFeed}
      onPlay={handlePlay}
      loading={feedLoading || playLoading || isLoading}
    />
  );
}
