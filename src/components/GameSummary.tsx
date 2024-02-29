// src/components/GameSummary.tsx
import React from "react";

interface GameSummaryProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

const GameSummary: React.FC<GameSummaryProps> = ({ homeTeam, awayTeam, homeScore, awayScore}) => {
  return (
    <div>
      {homeTeam} - {homeScore} vs {awayTeam} - {awayScore}
    </div>
  );
};

export default GameSummary;
