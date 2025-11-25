import React from "react";
import { useAccount } from "wagmi";
import { useGetOwnerPets } from "../hooks/useChainGotchi";
import { PetStatsCard } from "./PetStatsCard";
import StartBattleButton from "../components/StartBattleButton";

export default function BattleActionsList() {
  const { address } = useAccount();
  const { data: ids } = useGetOwnerPets(address || "");
  if (!ids || ids.length === 0) return null;
  return (
    <div className="my-6">
      <h3 className="font-bold mb-2">Start a Battle with Your Pet</h3>
      <div className="flex flex-wrap gap-4">
        {ids.map((id: number) => (
          <div key={id} className="w-48">
            <PetStatsCard tokenId={id} />
            <StartBattleButton petId={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
