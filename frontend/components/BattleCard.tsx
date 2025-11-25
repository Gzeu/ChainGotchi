import React from 'react';

export interface BattleCardProps {
  battleId: number;
  pet1: string;
  pet2: string;
  challenger: string;
  opponent: string;
  isActive: boolean;
  winner: string;
  onJoin?: () => void;
  loading?: boolean;
}

export const BattleCard: React.FC<BattleCardProps> = ({ battleId, pet1, pet2, challenger, opponent, isActive, winner, onJoin, loading }) => {
  return (
    <div className={"rounded-lg border border-indigo-300 p-4 mb-2 bg-gradient-to-br from-white to-indigo-50 shadow-md"}>
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Battle #{battleId}</span>
        {isActive ? <span className="text-green-600">Active</span>
          : <span className="text-gray-600">Ended</span>}
      </div>
      <div className="text-xs mb-1">Challenger: {challenger}</div>
      <div className="text-xs mb-1">Pet 1: {pet1} {pet2 && (<span>/ Pet 2: {pet2}</span>)}</div>
      {opponent && <div className="text-xs mb-1">Opponent: {opponent}</div>}
      {winner && <div className="text-xs mb-1 text-pink-600">Winner: {winner}</div>}
      {isActive && onJoin && <button className="btn btn-warning btn-xs mt-2" disabled={loading} onClick={onJoin}>{loading ? "Joining..." : "Join Battle ⚔️"}</button>}
    </div>
  );
};
