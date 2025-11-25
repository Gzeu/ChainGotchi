import React from "react";
import { useGetActiveBattles } from "../hooks/useBattle";
import { BattleCard } from "../components/BattleCard";

export default function BattlePage() {
  const { data: battles } = useGetActiveBattles();

  return (
    <main className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Battle Arena</h2>
      {battles && battles.length > 0 ? (
        <div className="space-y-4">
          {battles.map((battle: any) => (
            <BattleCard key={battle.battleId} {...battle} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No active battles. Be the first to create one!</div>
      )}
    </main>
  );
}
