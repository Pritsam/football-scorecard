import React from "react";

interface GameProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  onUpdateScore: () => void;
  onFinishGame: () => void;
}

const Game: React.FC<GameProps> = ({ homeTeam, awayTeam, homeScore, awayScore, onUpdateScore, onFinishGame }) => {
  return (
    <div>
      {homeTeam} {homeScore} - {awayScore} {awayTeam}
      <button onClick={onUpdateScore}>Update Score</button>
      <button onClick={onFinishGame}>Finish Game</button>
    </div>
  );
};

export default Game;
