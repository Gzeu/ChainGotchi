import React from "react";
import { useJoinBattle } from "../hooks/useBattle";

export function JoinBattleButton({ battleId, petId }: { battleId: number, petId: number }) {
  const { write, isLoading } = useJoinBattle();
  return (
    <button className="btn btn-warning btn-xs mt-2" disabled={isLoading} onClick={() => write({ args: [battleId, petId], value: BigInt(1e15) })}>
      {isLoading ? "Joining..." : "Join Battle ⚔️"}
    </button>
  );
}
