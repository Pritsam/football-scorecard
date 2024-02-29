import React, { useState } from "react";
import Game from "./Game";
import UpdateScorePopup from "./UpdateScorePopup";
// import { updateScore } from "../state/scoreboardSlice";
// import { useDispatch } from "react-redux";

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

  //const dispatch = useDispatch();
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);

  const openUpdateScorePopup = (index: number) => {
    setSelectedGameIndex(index);
  };

  const closeUpdateScorePopup = () => {
    setSelectedGameIndex(null);
  };

  const handleUpdateScore = (homeScore: number, awayScore: number) => {
    if (selectedGameIndex !== null) {
      //dispatch(updateScore({ selectedGameIndex, homeScore, awayScore }));
      console.log(homeScore, awayScore);
      onUpdateScore(selectedGameIndex, homeScore, awayScore);
      closeUpdateScorePopup();
    }
  };

  return (
    <div>
      {games.map((game, index) => (
        <div key={index}>
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
