import React from "react";

export type EvolutionStage = 0 | 1 | 2 | 3 | 4;

const evolutionMap = ["Egg","Baby","Teen","Adult","Master"];
const emojiMap = ["🥚","👶","🧒","💪","👑"];

export interface PetData {
  id: number;
  name: string;
  level: number;
  xp: number;
  hunger: number;
  happiness: number;
  evolution: EvolutionStage;
  wins: number;
  losses: number;
  isAlive: boolean;
}

export const PetCard: React.FC<{ pet: PetData; onFeed?: () => void; onPlay?: () => void; onBattle?: () => void; loading?: boolean }> = ({ pet, onFeed, onPlay, onBattle, loading }) => {
  const xpProgress = Math.min((pet.xp / (pet.level * 100)) * 100, 100);
  const hungerColor = pet.hunger > 50 ? "bg-green-400" : pet.hunger > 25 ? "bg-yellow-400" : "bg-red-500";

  return (
    <div className={`rounded-2xl shadow-lg p-6 bg-white dark:bg-zinc-900 max-w-xs transition-all duration-150 border-2 ${pet.isAlive ? "border-indigo-300" : "border-red-400 opacity-70"}`}>
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-3xl">{emojiMap[pet.evolution]}</span>
        <span className="font-bold text-lg">{pet.name}</span>
        <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-800 text-xs">Lv. {pet.level}</span>
        {!pet.isAlive && <span className="ml-2 px-2 py-0.5 rounded bg-red-200 text-red-800 text-xs">DEAD</span>}
      </div>
      <div className="mb-2">
        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 text-xs">{evolutionMap[pet.evolution]}</span>
      </div>
      <div className="space-y-2 mb-2">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-indigo-500 h-4 rounded-full" style={{ width: `${xpProgress}%` }}></div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-200">
          <span>XP: {pet.xp} / {pet.level * 100}</span>
          <span className="font-mono">{Math.floor(xpProgress)} %</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Hunger</span>
          <span className={`rounded py-0.5 px-2 text-white ${hungerColor}`}>{pet.hunger} / 100</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Happiness</span>
          <span className="rounded py-0.5 px-2 bg-cyan-400 text-white">{pet.happiness}/100</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Wins</span>
          <span className="rounded bg-green-200 px-2 py-0.5">{pet.wins}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Losses</span>
          <span className="rounded bg-red-100 px-2 py-0.5">{pet.losses}</span>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button className="btn btn-sm btn-success" disabled={!pet.isAlive || loading} onClick={onFeed}>Feed 🍖</button>
        <button className="btn btn-sm btn-info" disabled={!pet.isAlive || loading} onClick={onPlay}>Play 🎲</button>
        <button className="btn btn-sm btn-warning" disabled={!pet.isAlive || loading} onClick={onBattle}>Battle ⚔️</button>
      </div>
    </div>
  );
};
