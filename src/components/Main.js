import { useState } from "react";
import classes from "./Main.module.css";
import Overlay from "./Overlays/Overlay";
import PlayerCards from "./PlayersCard";

const Main = () => {
  // 0 is Player 1, 1 is Player 2
  const [playerTurn, switchPlayerTurn] = useState(0);

  const initialState = {
    turnOf: 1,
    p1_score: 0,
    p2_score: 0,
    current: 0,
  };

  const dispatchFn = (state, action) => {
    if (action.type === "SWITCH") {
      return {
        ...state,
        turnOf: state.turnOf === 1 ? 2 : 1,
      };
    }

    if (action.type === "HOLD") {
    }

    if (action.type === "RESET") {
      return {
        ...initialState,
      };
    }

    if (action.type === "HOLD") {
      const player = state.turnOf;
      if (player === 1) {
        const newScore = state.p1_score + state.current;
        return {
          ...state,
          p1_score: newScore,
          current: 0,
        };
      }
      if (player === 2) {
        const newScore = state.p2_score + state.current;
        return {
          ...state,
          p2_score: newScore,
          current: 0,
        };
      }
    }
    return state;
  };

  return (
    <main className={classes.main}>
      <PlayerCards
        pid="1"
        score="20"
        currentVal="5"
        active={playerTurn === 1}
      />
      <PlayerCards
        pid="2"
        score="30"
        currentVal="1"
        active={playerTurn === 2}
      />
      <Overlay turnOf={playerTurn} switchTurn={switchPlayerTurn} />
    </main>
  );
};

export default Main;
