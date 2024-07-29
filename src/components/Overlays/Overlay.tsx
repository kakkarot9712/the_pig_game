import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "../Local/Button";
import Dice from "./Dice";
import "./Overlay.css";
import {
  gameReset,
  gameStarted,
  modeSelected,
  turnChanged,
} from "../../store/slice";

interface OverlayProps {
  currentScore: number;
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
}

const Overlay = (props: OverlayProps) => {
  const [num, setnum] = useState(0);
  const { started, winner } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();
  // const mode = useAppSelector(state => state.session.mode);

  const animate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    (event.target as HTMLButtonElement).classList.add("push");
    setTimeout(() => {
      (event.target as HTMLElement).classList.remove("push");
    }, 400);
  };

  const resetAll = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    animate(event);
    dispatch(gameReset());
    setnum(0);
    props.setCurrentScore(0);
  };

  const holdVal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    animate(event);
    dispatch(turnChanged(props.currentScore));
    props.setCurrentScore(0);
    // TODO: Rework Hold Logic
    // props.dispatch({ type: "HOLD" });
    // props.dispatch({ type: "CHECK-WINNER" });
  };

  const rollTheDice = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    animate(event);
    const random = Math.floor(Math.random() * 6) + 1;
    if (num === 0) dispatch(gameStarted());
    setnum(random);
    if (random === 1) {
      dispatch(turnChanged(0));
      props.setCurrentScore(0);
      return;
    }
    props.setCurrentScore(s => s+random);
    // TODO: Rework Hold Logic
    // props.dispatch({ type: "CURRENT", value: random });
  };

  return (
    <div className="overlay">
      <div className="controls">
        <Button name="🔃 Restart Game" onClickHandler={resetAll} />
        {!started || Boolean(winner) ? (
          <Button
            name="🔙 Go Back"
            onClickHandler={dispatch.bind(this, modeSelected(null))}
          />
        ) : null}
      </div>

      <Dice num={num} />

      <div className="game-controls">
        <Button
          name="🎲 Roll Dice"
          onClickHandler={rollTheDice}
          disabled={Boolean(winner)}
        />

        <Button
          name="📥 Hold"
          onClickHandler={holdVal}
          disabled={Boolean(winner)}
        />
      </div>
    </div>
  );
};

export default Overlay;
