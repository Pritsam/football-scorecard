import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import "../../styles/Modal.css";

interface UpdateScorePopupProps {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  onUpdateScore: (homeScore: number, awayScore: number) => void;
  onClose: () => void;
}

const UpdateScorePopup: React.FC<UpdateScorePopupProps> = ({
  gameId,
  homeTeamName,
  awayTeamName,
  onUpdateScore,
  onClose,
}) => {
  const game = useSelector((state: RootState) => state.scoreboard.games[gameId]);
  const [homeScore, setHomeScore] = useState(game.homeScore);
  const [awayScore, setAwayScore] = useState(game.awayScore);

  const handleUpdateScore = () => {
    onUpdateScore(homeScore, awayScore);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>
          {`${homeTeamName} Score:`}
          <input
            type="number"
            value={homeScore}
            className="modal-input"
            onChange={(e) => setHomeScore(Math.max(0, Number(e.target.value)))}
          />
        </label>
        <label>
        {`${awayTeamName} Score:`}
          <input
            type="number"
            value={awayScore}
            className="modal-input"
            onChange={(e) => setAwayScore(Math.max(0, Number(e.target.value)))}
          />
        </label>
        <div>
        <button onClick={handleUpdateScore}>Update Score</button>
        <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateScorePopup;
