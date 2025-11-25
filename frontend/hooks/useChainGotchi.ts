import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { CHAINGOTCHI_NFT_ADDRESS, ChainGotchiNFT_ABI } from "../lib/contracts";

export const useMintPet = () => {
  return useContractWrite({
    address: CHAINGOTCHI_NFT_ADDRESS,
    abi: ChainGotchiNFT_ABI,
    functionName: "mintPet",
  });
};

export const useFeedPet = () => {
  return useContractWrite({
    address: CHAINGOTCHI_NFT_ADDRESS,
    abi: ChainGotchiNFT_ABI,
    functionName: "feedPet",
  });
};

export const usePlayWithPet = () => {
  return useContractWrite({
    address: CHAINGOTCHI_NFT_ADDRESS,
    abi: ChainGotchiNFT_ABI,
    functionName: "playWithPet",
  });
};

export const useGetPetStats = (tokenId: number) => {
  return useContractRead({
    address: CHAINGOTCHI_NFT_ADDRESS,
    abi: ChainGotchiNFT_ABI,
    functionName: "getPetStats",
    args: [tokenId],
  });
};

export const useGetOwnerPets = (address: string) => {
  return useContractRead({
    address: CHAINGOTCHI_NFT_ADDRESS,
    abi: ChainGotchiNFT_ABI,
    functionName: "getOwnerPets",
    args: [address],
  });
};
