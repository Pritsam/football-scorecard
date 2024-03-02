import React, { useState } from "react";
import "../../styles/Modal.css";

interface StartGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (homeTeam: string, awayTeam: string) => void;
}

const StartGameModal: React.FC<StartGameModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
}) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [canStart, setCanStart] = useState<boolean>(true);

  const handleStartGame = () => {
    if (homeTeam.trim() === "" || awayTeam.trim() === "") {
      setCanStart(false);
    } else {
      setCanStart(true);
      onStartGame(homeTeam, awayTeam);
      setHomeTeam("");
      setAwayTeam("");
    }
  };

  const handleClose = () => {
    setCanStart(true);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>
          Home Team Name:
          <input
            type="text"
            value={homeTeam}
            className="modal-input"
            onChange={(e) => setHomeTeam(e.target.value)}
          />
        </label>
        <label>
          Away Team Name:
          <input
            type="text"
            value={awayTeam}
            className="modal-input"
            onChange={(e) => setAwayTeam(e.target.value)}
          />
        </label>
        <div>
          <button onClick={handleStartGame}>Start Game</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
      {!canStart && <p style={{ color: "red" }}>Please enter the team names</p>}
    </div>
  ) : null;
};

export default StartGameModal;
