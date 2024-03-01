import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

test('renders game component', () => {
  const { getByText } = render(
    <Game
      homeTeam="Home"
      awayTeam="Away"
      homeScore={0}
      awayScore={0}
      onUpdateScore={() => {}}
      onFinishGame={() => {}}
    />
  );

  expect(getByText('Home 0 - 0 Away')).toBeInTheDocument();
});

test('calls onUpdateScore and onFinishGame when buttons are clicked', () => {
  const onUpdateScore = jest.fn();
  const onFinishGame = jest.fn();

  const { getByText } = render(
    <Game
      homeTeam="Home"
      awayTeam="Away"
      homeScore={0}
      awayScore={0}
      onUpdateScore={onUpdateScore}
      onFinishGame={onFinishGame}
    />
  );

  fireEvent.click(getByText('Update Score'));
  fireEvent.click(getByText('Finish Game'));

  expect(onUpdateScore).toHaveBeenCalled();
  expect(onFinishGame).toHaveBeenCalled();
});
