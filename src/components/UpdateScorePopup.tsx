import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface UpdateScorePopupProps {
  gameId: number;
  onUpdateScore: (homeScore: number, awayScore: number) => void;
  onClose: () => void;
}

const UpdateScorePopup: React.FC<UpdateScorePopupProps> = ({
  gameId,
  onUpdateScore,
  onClose,
}) => {
  //const [homeScore, setHomeScore] = useSelector(0);
  //const [awayScore, setAwayScore] = useSelector(0);
  const game = useSelector((state: RootState) => state.scoreboard.games[gameId]);
  const [homeScore, setHomeScore] = useState(game.homeScore);
  const [awayScore, setAwayScore] = useState(game.awayScore);

  const handleUpdateScore = () => {
    onUpdateScore(homeScore, awayScore);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <label>
          Home Score:
          <input
            type="number"
            value={homeScore}
            onChange={(e) => setHomeScore(Math.max(0, Number(e.target.value)))}
          />
        </label>
        <label>
          Away Score:
          <input
            type="number"
            value={awayScore}
            onChange={(e) => setAwayScore(Math.max(0, Number(e.target.value)))}
          />
        </label>
        <button onClick={handleUpdateScore}>Update Score</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateScorePopup;
