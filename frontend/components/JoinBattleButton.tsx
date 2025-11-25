import React from "react";
import { useJoinBattle } from "../hooks/useBattle";
import { safeAction } from "../lib/safeAction";

export function JoinBattleButton({ battleId, petId }: { battleId: number, petId: number }) {
  const { writeAsync, isLoading } = useJoinBattle();
  return (
    <button className="btn btn-warning btn-xs mt-2" disabled={isLoading} onClick={() => safeAction(() => writeAsync({ args: [battleId, petId], value: BigInt(1e15) }), "Battle joined!")}>
      {isLoading ? "Joining..." : "Join Battle ⚔️"}
    </button>
  );
}
