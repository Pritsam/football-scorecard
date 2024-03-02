import React from "react";
import { render, fireEvent, findByText, screen } from "@testing-library/react";
import StartGameModal from "./StartGameModal";

test("renders start game modal when open", () => {
  const { getByLabelText } = render(
    <StartGameModal isOpen={true} onClose={() => {}} onStartGame={() => {}} />
  );

  expect(getByLabelText("Home Team Name:")).toBeInTheDocument();
  expect(getByLabelText("Away Team Name:")).toBeInTheDocument();
});

test('handles input changes', () => {
  const { getByLabelText } = render(
    <StartGameModal isOpen={true} onClose={() => {}} onStartGame={() => {}} />
  );

  const homeTeamInput = getByLabelText('Home Team Name:') as HTMLInputElement;
  const awayTeamInput = getByLabelText('Away Team Name:') as HTMLInputElement;

  fireEvent.change(homeTeamInput, { target: { value: 'Home Team' } });
  fireEvent.change(awayTeamInput, { target: { value: 'Away Team' } });

  expect(homeTeamInput.value).toBe('Home Team');
  expect(awayTeamInput.value).toBe('Away Team');
});

test('triggers onStartGame with correct arguments on "Start Game" button click', () => {
  const handleStartGame = jest.fn();
  const { getByText, getByLabelText } = render(
    <StartGameModal isOpen={true} onClose={() => {}} onStartGame={handleStartGame} />
  );

  fireEvent.change(getByLabelText('Home Team Name:'), { target: { value: 'Home Team' } });
  fireEvent.change(getByLabelText('Away Team Name:'), { target: { value: 'Away Team' } });

  fireEvent.click(getByText('Start Game'));

  expect(handleStartGame).toHaveBeenCalledWith('Home Team', 'Away Team');
});

test('triggers onClose on "Cancel" button click', () => {
  const onCloseMock = jest.fn();
  const { getByText } = render(<StartGameModal isOpen={true} onClose={onCloseMock} onStartGame={() => {}} />);

  fireEvent.click(getByText('Cancel'));

  expect(onCloseMock).toHaveBeenCalled();
});

test('displays error message when starting the game without entering team names', () => {
  const { getByText } = render(
    <StartGameModal isOpen={true} onClose={() => {}} onStartGame={() => {}} />
  );

  fireEvent.click(getByText('Start Game'));

  expect(getByText('Please enter the team names')).toBeInTheDocument();
});
