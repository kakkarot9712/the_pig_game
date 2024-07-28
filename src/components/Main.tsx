import classes from "./Main.module.css";
import Overlay from "./Overlays/Overlay";
import PlayerCards from "./PlayersCard";
import Alert from "./UI/Alert/Alert";
import { Turn } from "../store/slice";
import { useAppSelector } from "../store/hooks";
import { useState } from "react";

// const { REACT_APP_BACKEND_URL } = import.meta.env;

// const ws = new WebSocket(REACT_APP_BACKEND_URL);

// const initialState = {
//   turnOf: 1,
//   p1_score: 0,
//   p2_score: 0,
//   current: 0,
//   foundWinner: false,
// };

// TODO: Fix Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const reducerFn = (state: any, action: any) => {
//   // Done
//   if (action.type === "SWITCH") {
//     return {
//       ...state,
//       turnOf: state.turnOf === 1 ? 2 : 1,
//     };
//   }

//   // Done
//   if (action.type === "CHECK-WINNER") {
//     if (state.p1_score > 100 || state.p2_score > 100) {
//       if (state.p1_score > 100) {
//         return {
//           ...state,
//           foundWinner: 1,
//         };
//       }
//       return {
//         ...state,
//         foundWinner: 2,
//       };
//     }
//     return {
//       ...state,
//     };
//   }

//   if (action.type === "CURRENT") {
//     return {
//       ...state,
//       current: state.current + action.value,
//     };
//   }

//   // Done from turn
//   if (action.type === "ONE") {
//     return {
//       ...state,
//       turnOf: state.turnOf === 1 ? 2 : 1,
//       current: 0,
//     };
//   }

//   // Done!
//   if (action.type === "RESET") {
//     return {
//       ...initialState,
//     };
//   }

//   if (action.type === "HOLD") {
//     const player = state.turnOf;
//     if (player === 1) {
//       const newScore = state.p1_score + state.current;
//       return {
//         ...state,
//         p1_score: newScore,
//         current: 0,
//         turnOf: 2,
//       };
//     }
//     if (player === 2) {
//       const newScore = state.p2_score + state.current;
//       return {
//         ...state,
//         p2_score: newScore,
//         current: 0,
//         turnOf: 1,
//       };
//     }
//   }
//   return state;
// };

const Main = () => {
  // 1 is Player 1, 2 is Player 2
  // const [state, dispatchFn] = useReducer(reducerFn, initialState);
  const { p1_score, p2_score, turn, winner } = useAppSelector(
    (state) => state.session,
  );
  const [currentScore, setCurrentScore] = useState(0);

  return (
    <>
      <Alert alert={winner} />
      <main className={classes.main}>
        <PlayerCards
          pid={Turn.Player1}
          score={p1_score}
          currentVal={turn === Turn.Player1 ? currentScore : 0}
          active={turn === Turn.Player1}
          winner={winner === Turn.Player1}
        />
        <PlayerCards
          pid={Turn.Player2}
          score={p2_score}
          currentVal={turn === Turn.Player2 ? currentScore : 0}
          active={turn === Turn.Player2}
          winner={winner === Turn.Player2}
        />
        <Overlay
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
        />
      </main>
    </>
  );
};

export default Main;
