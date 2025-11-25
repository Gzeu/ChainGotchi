import { ChainGotchiNFT__factory, BattleArena__factory } from "../../typechain-types";
import { config } from "./wagmi";
// Contract addresses must be filled after deployment
export const CHAINGOTCHI_NFT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
export const BATTLE_ARENA_ADDRESS = process.env.NEXT_PUBLIC_BATTLE_ADDRESS || "";

export const ChainGotchiNFT_ABI = ChainGotchiNFT__factory.abi;
export const BattleArena_ABI = BattleArena__factory.abi;
