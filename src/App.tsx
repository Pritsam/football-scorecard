import React, { useState } from "react";
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
  //const [games, setGames] = useState<GameDetails[]>([]);
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
    // setGames([
    //   ...games,
    //   { homeTeam, awayTeam, homeScore: 0, awayScore: 0, startTime: new Date() },
    // ]);
    closeModal();
  };

  const updateScore = (index: number, homeScore: number, awayScore: number) => {
    dispatch(modifyScore({ index, homeScore, awayScore }));
    // const updatedGames = [...games];
    // updatedGames[index] = { ...updatedGames[index], homeScore, awayScore };
    // setGames(updatedGames);
  };

  const finishGame = (index: number) => {
    dispatch(endGame(index));
    // const updatedGames = [...games];
    // updatedGames.splice(index, 1);
    // setGames(updatedGames);
  };

  const showSummary = () => {
    const sortedGames = [...games].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA;
      } else {
        return b.startTime.getTime() - a.startTime.getTime();
      }
    });

    // return sortedGames.map((game, index) => (
    //   <GameSummary
    //     key={index}
    //     homeTeam={game.homeTeam}
    //     awayTeam={game.awayTeam}
    //     homeScore={game.homeScore}
    //     awayScore={game.awayScore}
    //     // totalScore={game.homeScore + game.awayScore}
    //     // startTime={game.startTime}
    //   />
    // ));
    setSortedGames(sortedGames);
    setIsSummaryOpen(!isSummaryOpen);
  };

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
        sortedGames.map((game, index) => (
          <GameSummary
            key={index}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
            // totalScore={game.homeScore + game.awayScore}
            // startTime={game.startTime}
          />
        ))}
    </div>
  );
};

export default App;
