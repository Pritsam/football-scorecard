import React, { useState } from "react";
import Game from "./Game";
import UpdateScorePopup from "./UpdateScorePopup";
import "../styles/Scoreboard.css";

interface ScoreboardProps {
  games: {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: Date;
  }[];
  onUpdateScore: (index: number, homeScore: number, awayScore: number) => void;
  onFinishGame: (index: number) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ games, onUpdateScore, onFinishGame }) => {
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);

  const openUpdateScorePopup = (index: number) => {
    setSelectedGameIndex(index);
  };

  const closeUpdateScorePopup = () => {
    setSelectedGameIndex(null);
  };

  const handleUpdateScore = (homeScore: number, awayScore: number) => {
    if (selectedGameIndex !== null) {
      onUpdateScore(selectedGameIndex, homeScore, awayScore);
      closeUpdateScorePopup();
    }
  };

  return (
    <div className="scoreboard-container">
      <h2 className="scoreboard-title">Scoreboard</h2>
      {games.map((game, index) => (
        <div key={index} className="game-container">
          <Game
            {...game}
            onUpdateScore={() => openUpdateScorePopup(index)}
            onFinishGame={() => onFinishGame(index)}
          />
          {selectedGameIndex === index && (
            <UpdateScorePopup
              gameId={selectedGameIndex}
              onUpdateScore={handleUpdateScore}
              onClose={closeUpdateScorePopup}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
