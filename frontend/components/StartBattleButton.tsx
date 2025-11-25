import React from "react";
import { useAccount } from "wagmi";
import { useCreateBattle } from "../hooks/useBattle";
export default function StartBattleButton({ petId }: { petId: number }) {
  const { write, isLoading } = useCreateBattle();
  const { address } = useAccount();
  return (
    <button
      className="btn btn-warning btn-xs mt-2"
      disabled={isLoading || !address}
      onClick={() => write({ args: [petId], value: BigInt(1e15) })}
    >
      {isLoading ? "Starting..." : "Start Battle"}
    </button>
  );
}
