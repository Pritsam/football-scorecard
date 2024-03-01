import React from 'react';
import { render } from '@testing-library/react';
import GameSummary from './GameSummary';

test('renders game summary component', () => {
  const { getByText } = render(
    <GameSummary homeTeam="Home" awayTeam="Away" homeScore={2} awayScore={1} />
  );

  expect(getByText('Home 2 - Away 1')).toBeInTheDocument();
});
