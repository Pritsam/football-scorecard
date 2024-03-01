import React, { useCallback, useEffect, useState } from "react";
import Scoreboard from "./components/Scoreboard";
import StartGameModal from "./components/StartGameModal";
import GameSummary from "./components/GameSummary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { beginGame, endGame, modifyScore } from "./state/scoreboardSlice";
import "./App.css";

interface GameDetails {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: Date;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.scoreboard.games);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [sortedGames, setSortedGames] = useState<GameDetails[]>([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const startGame = (homeTeam: string, awayTeam: string) => {
    dispatch(beginGame({ homeTeam, awayTeam }));
    closeModal();
  };

  const updateScore = (index: number, homeScore: number, awayScore: number) => {
    dispatch(modifyScore({ index, homeScore, awayScore }));
  };

  const finishGame = (index: number) => {
    dispatch(endGame(index));
  };

  const sortGames = useCallback(() => {
    const sortedGames = [...games].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA;
      } else {
        return b.startTime.getTime() - a.startTime.getTime();
      }
    });

    return sortedGames;
  }, [games]);

  const showSummary = () => {
    const sortedGames = sortGames();
    setSortedGames(sortedGames);
    setIsSummaryOpen(!isSummaryOpen);
  };

  useEffect(() => {
    const sortedGames = sortGames();
    setSortedGames(sortedGames);
  }, [games, sortGames]);

  return (
    <div>
      <Scoreboard
        games={games}
        onUpdateScore={updateScore}
        onFinishGame={finishGame}
      />
      <button onClick={openModal}>New Game</button>
      <StartGameModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onStartGame={startGame}
      />
      <button onClick={showSummary}>Show/Hide Summary</button>
      {isSummaryOpen &&
        (games.length !== 0 ? (
          <div className="game-summary-container">
            <h2 className="game-summary-title">Summary</h2>
            {sortedGames.map((game, index) => (
              <GameSummary
                key={index}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                homeScore={game.homeScore}
                awayScore={game.awayScore}
              />
            ))}
          </div>
        ) : (
          <div>No games available currently.</div>
        ))}
    </div>
  );
};

export default App;
