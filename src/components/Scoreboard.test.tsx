import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Scoreboard from "./Scoreboard";

const mockGames = [
  {
    homeTeam: "TeamA",
    awayTeam: "TeamB",
    homeScore: 0,
    awayScore: 0,
    startTime: new Date(),
  },
];

test("renders Scoreboard with game details", () => {
  const mockOnUpdateScore = jest.fn();
  const mockOnFinishGame = jest.fn();

  render(
    <Scoreboard
      games={mockGames}
      onUpdateScore={mockOnUpdateScore}
      onFinishGame={mockOnFinishGame}
    />
  );

  expect(screen.getByText("Scoreboard")).toBeInTheDocument();
});
