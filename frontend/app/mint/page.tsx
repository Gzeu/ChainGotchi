import React, { useState } from "react";
import { useMintPet } from "../hooks/useChainGotchi";

export default function MintPage() {
  const [name, setName] = useState("");
  const { write, isLoading, isSuccess, data } = useMintPet();

  const handleMint = () => {
    if (name && name.length <= 20) {
      write({ args: [name], value: BigInt(1e16) }); // 0.01 BNB in wei
    }
  };

  return (
    <main className="container mx-auto max-w-md py-8">
      <h2 className="text-3xl font-bold mb-2">Mint a ChainGotchi</h2>
      <p className="mb-4">Pick a name for your new pet (max 20 chars) and mint for <b>0.01 BNB</b>.</p>
      <input
        className="input input-bordered w-full mb-2"
        placeholder="Pet name"
        maxLength={20}
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={isLoading || isSuccess}
      />
      <button className="btn btn-primary w-full mb-2" disabled={!name || isLoading || isSuccess} onClick={handleMint}>
        {isLoading ? "Minting..." : isSuccess ? "Minted!" : "Mint Pet 🥚"}
      </button>
      {isSuccess && <div className="alert alert-success mt-3">Success! Check 'My Pets' page.</div>}
    </main>
  );
}
