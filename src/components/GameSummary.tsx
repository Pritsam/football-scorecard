import React from "react";
import "../styles/GameSummary.css";

interface GameSummaryProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
}) => {
  return (
    <div className="game-container">
      {homeTeam} {homeScore} - {awayTeam} {awayScore}
    </div>
  );
};

export default GameSummary;
