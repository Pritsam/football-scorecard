import React, { useState } from "react";

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

  const handleStartGame = () => {
    onStartGame(homeTeam, awayTeam);
    setHomeTeam("");
    setAwayTeam("");
    //onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>
          Home Team:
          <input
            type="text"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          />
        </label>
        <label>
          Away Team:
          <input
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
          />
        </label>
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default StartGameModal;
