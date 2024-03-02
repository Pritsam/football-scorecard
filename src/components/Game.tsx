import React from "react";
import "../styles/ShowScore.css";

interface GameProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  onUpdateScore: () => void;
  onFinishGame: () => void;
}

const Game: React.FC<GameProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  onUpdateScore,
  onFinishGame,
}) => {
  return (
    <div>
      <div className="display-score">
        {homeTeam} {homeScore} - {awayScore} {awayTeam}
      </div>

      {<button onClick={onUpdateScore}>Update Score</button>}
      <button onClick={onFinishGame}>Finish Game</button>
    </div>
  );
};

export default Game;
