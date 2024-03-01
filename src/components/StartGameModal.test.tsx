import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StartGameModal from './StartGameModal';

test('renders start game modal when open', () => {
  const { getByLabelText } = render(
    <StartGameModal isOpen={true} onClose={() => {}} onStartGame={() => {}} />
  );

  expect(getByLabelText('Home Team:')).toBeInTheDocument();
  expect(getByLabelText('Away Team:')).toBeInTheDocument();
});

test('calls onClose and onStartGame when buttons are clicked', () => {
  const onClose = jest.fn();
  const onStartGame = jest.fn();

  const { getByText } = render(
    <StartGameModal isOpen={true} onClose={onClose} onStartGame={onStartGame} />
  );

  fireEvent.click(getByText('Start Game'));
  fireEvent.click(getByText('Cancel'));

  expect(onStartGame).toHaveBeenCalled();
  expect(onClose).toHaveBeenCalled();
});
