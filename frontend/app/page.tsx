import React from "react";
export default function HomePage() {
  return (
    <main className="container mx-auto py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">🐣 ChainGotchi</h1>
      <p className="mb-4 text-xl text-gray-600">BNB Chain Tamagotchi • Evolving XP-Based NFT Pets!</p>
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <a href="/mint" className="btn btn-primary text-lg">Mint a Pet</a>
        <a href="/pets" className="btn btn-secondary text-lg">My Pets</a>
        <a href="/battle" className="btn btn-warning text-lg">Battle Arena</a>
      </div>
      <div className="mt-12 max-w-xl text-center text-gray-500">
        <p>Mint, feed, and play with NFT pets. Evolve through XP, battle others, and climb the leaderboard!</p>
      </div>
    </main>
  );
}
