import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum Mode {
  Local = 1,
  Online = 2,
}

export enum Turn {
  Player1 = 1,
  Player2 = 2,
}

export interface GameState {
  mode: Mode | null;
  started: boolean;
  turn: Turn;
  p1_score: number;
  p2_score: number;
  winner: Turn | null;
}

const initialState: GameState = {
  mode: null,
  started: false,
  turn: Turn.Player1,
  p1_score: 0,
  p2_score: 0,
  winner: null,
};

// TODO: Fix Type
export const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    modeSelected: (state, action: PayloadAction<Mode | null>) => {
      state.mode = action.payload;
    },

    gameStarted: (state) => {
      state.started = true;
    },

    gameStopped: (state) => {
      state.started = false;
    },

    turnChanged: (state, action: PayloadAction<number>) => {
      // debugger;
      if (state.turn === Turn.Player1) {
        state.p1_score += action.payload;
        state.turn = Turn.Player2;
      } else {
        state.p2_score += action.payload;
        state.turn = Turn.Player1;
      }
      if (state.p1_score > 100 || state.p2_score > 100) {
        if (state.p1_score > 100) state.winner = Turn.Player1;
        else state.winner = Turn.Player2;
      }
    },

    gameReset: (state) => {
      state.p1_score = 0;
      state.p2_score = 0;
      state.started = false;
      state.turn = Turn.Player1;
      state.winner = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  modeSelected,
  gameStarted,
  gameStopped,
  gameReset,
  turnChanged,
} = gameState.actions;

export default gameState.reducer;
