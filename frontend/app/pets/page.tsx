import React from "react";
import { useAccount } from "wagmi";
import { useGetOwnerPets, useGetPetStats } from "../hooks/useChainGotchi";
import { PetCard } from "../components/PetCard";

export default function PetsPage() {
  const { address } = useAccount();
  const { data: ids } = useGetOwnerPets(address || "");

  return (
    <main className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">My Pets</h2>
      {ids && ids.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {ids.map((id: number) => (
            <PetStatsCard key={id} tokenId={id} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No pets found. Go mint one!</div>
      )}
    </main>
  );
}

function PetStatsCard({ tokenId }: { tokenId: number }) {
  const { data: pet } = useGetPetStats(tokenId);
  if (!pet) return <div className="skeleton h-56 w-full" />;
  return <PetCard pet={pet} />;
}
