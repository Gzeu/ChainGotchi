import { useContractWrite, useContractRead } from "wagmi";
import { BATTLE_ARENA_ADDRESS, BattleArena_ABI } from "../lib/contracts";

export const useCreateBattle = () => {
  return useContractWrite({
    address: BATTLE_ARENA_ADDRESS,
    abi: BattleArena_ABI,
    functionName: "createBattle",
  });
};

export const useJoinBattle = () => {
  return useContractWrite({
    address: BATTLE_ARENA_ADDRESS,
    abi: BattleArena_ABI,
    functionName: "joinBattle",
  });
};

export const useGetActiveBattles = () => {
  return useContractRead({
    address: BATTLE_ARENA_ADDRESS,
    abi: BattleArena_ABI,
    functionName: "getActiveBattles",
  });
};

export const useGetBattleHistory = (playerAddress: string) => {
  return useContractRead({
    address: BATTLE_ARENA_ADDRESS,
    abi: BattleArena_ABI,
    functionName: "getBattleHistory",
    args: [playerAddress],
  });
};
