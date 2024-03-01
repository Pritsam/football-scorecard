import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import UpdateScorePopup from './UpdateScorePopup';

const mockStore = configureStore([]);
const store = mockStore({
  scoreboard: {
    games: {
      1: {
        gameId: 1,
        homeScore: 0,
        awayScore: 0,
      },
    },
  },
});

describe('UpdateScorePopup', () => {
  test('calls onUpdateScore and onClose when buttons are clicked', () => {
    const mockOnUpdateScore = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <UpdateScorePopup gameId={1} onUpdateScore={mockOnUpdateScore} onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Update Score'));

    expect(mockOnUpdateScore).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when Cancel button is clicked', () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <UpdateScorePopup gameId={1} onUpdateScore={() => {}} onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
