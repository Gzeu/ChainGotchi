import React from 'react';
export const FeedButton: React.FC<{ onFeed: () => void; loading: boolean; disabled?: boolean }> = ({ onFeed, loading, disabled }) =>
  <button className="btn btn-success btn-sm" disabled={loading || disabled} onClick={onFeed}>
    {loading ? 'Feeding...' : 'Feed 🍖'}
  </button>;
