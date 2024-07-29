import classes from "./Local.module.css";
import Overlay from "../Overlays/Overlay";
import PlayerCards from "../PlayersCard";
import Alert from "./Alert/Alert";
import { Turn } from "../../store/slice";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const { REACT_APP_BACKEND_URL } = import.meta.env;

// const ws = new WebSocket(REACT_APP_BACKEND_URL);

const LocalMode = () => {
  const navigate = useNavigate();
  const { p1_score, p2_score, turn, winner, mode } = useAppSelector(
    (state) => state.session,
  );

  useEffect(() => {
    if(!mode) navigate("/")
  }, [mode])
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

export default LocalMode;
