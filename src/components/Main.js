import { useReducer } from "react";
import classes from "./Main.module.css";
import Overlay from "./Overlays/Overlay";
import PlayerCards from "./PlayersCard";
import Alert from "./UI/Alert/Alert";

const initialState = {
  turnOf: 1,
  p1_score: 0,
  p2_score: 0,
  current: 0,
  foundWinner: false,
};

const reducerFn = (state, action) => {
  if (action.type === "SWITCH") {
    return {
      ...state,
      turnOf: state.turnOf === 1 ? 2 : 1,
    };
  }

  if (action.type === "CHECK-WINNER") {
    if (state.p1_score > 100 || state.p2_score > 100) {
      if (state.p1_score > 100) {
        return {
          ...state,
          foundWinner: 1,
        };
      }
      return {
        ...state,
        foundWinner: 2,
      };
    }
    return {
      ...state,
    };
  }

  if (action.type === "CURRENT") {
    return {
      ...state,
      current: state.current + action.value,
    };
  }

  if (action.type === "ONE") {
    return {
      ...state,
      turnOf: state.turnOf === 1 ? 2 : 1,
      current: 0,
    };
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
        turnOf: 2,
      };
    }
    if (player === 2) {
      const newScore = state.p2_score + state.current;
      return {
        ...state,
        p2_score: newScore,
        current: 0,
        turnOf: 1,
      };
    }
  }
  return state;
};

const Main = () => {
  // 1 is Player 1, 2 is Player 2
  const [state, dispatchFn] = useReducer(reducerFn, initialState);
  return (
    <>
      <Alert alert={state.foundWinner} />
      <main className={classes.main}>
        <PlayerCards
          pid="1"
          score={state.p1_score}
          currentVal={state.turnOf === 1 ? state.current : 0}
          active={state.turnOf === 1}
          winner={state.foundWinner === 1}
        />
        <PlayerCards
          pid="2"
          score={state.p2_score}
          currentVal={state.turnOf !== 1 ? state.current : 0}
          active={state.turnOf === 2}
          winner={state.foundWinner === 2}
        />
        <Overlay state={state} dispatch={dispatchFn} />
      </main>
    </>
  );
};

export default Main;
