import React from "react";
import { useAccount } from "wagmi";
import { useCreateBattle } from "../hooks/useBattle";
import { safeAction } from "../lib/safeAction";
export default function StartBattleButton({ petId }: { petId: number }) {
  const { writeAsync, isLoading } = useCreateBattle();
  const { address } = useAccount();
  return (
    <button
      className="btn btn-warning btn-xs mt-2"
      disabled={isLoading || !address}
      onClick={() => safeAction(() => writeAsync({ args: [petId], value: BigInt(1e15) }), "Battle created!")}
    >
      {isLoading ? "Starting..." : "Start Battle"}
    </button>
  );
}
