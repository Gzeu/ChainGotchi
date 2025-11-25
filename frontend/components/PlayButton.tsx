import React from 'react';
export const PlayButton: React.FC<{ onPlay: () => void; loading: boolean; disabled?: boolean }> = ({ onPlay, loading, disabled }) =>
  <button className="btn btn-info btn-sm" disabled={loading || disabled} onClick={onPlay}>
    {loading ? 'Playing...' : 'Play 🎲'}
  </button>;
