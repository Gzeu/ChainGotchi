import { useAccount } from "wagmi";
import { useContractWrite } from "wagmi";
import { CHAINGOTCHI_NFT_ADDRESS, ChainGotchiNFT_ABI } from "../lib/contracts";
import { safeAction } from "../lib/safeAction";

export default function ClaimXPETButton({ tokenId }: { tokenId: number }) {
  const { address } = useAccount();
  const { writeAsync, isLoading } = useContractWrite({
    address: CHAINGOTCHI_NFT_ADDRESS,
    abi: ChainGotchiNFT_ABI,
    functionName: "claimRewards",
  });
  if (!address) return null;

  return (
    <button
      className="btn btn-accent btn-xs mt-1"
      disabled={isLoading}
      onClick={() => safeAction(() => writeAsync({ args: [tokenId] }), "XPET claimed!")}
    >
      {isLoading ? "Claiming..." : "Claim XPET"}
    </button>
  );
}
