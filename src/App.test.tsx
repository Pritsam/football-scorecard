import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "./App";

const mockStore = configureMockStore();

test("renders app component with mock store", () => {
  const initialState = {
    scoreboard: {
      games: [
        {
          homeTeam: "Home",
          awayTeam: "Away",
          homeScore: 1,
          awayScore: 2,
          startTime: new Date(),
        },
      ],
    },
  };

  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText("Home 1 - 2 Away")).toBeInTheDocument();
});

test('renders app component with mock store and shows "No games available currently" when no games are present', () => {
  const initialState = {
    scoreboard: {
      games: [],
    },
  };

  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(getByText("Show/Hide Summary"));

  expect(getByText("No games available currently.")).toBeInTheDocument();
});
