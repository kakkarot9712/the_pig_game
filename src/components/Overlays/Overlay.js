import React, { useState } from "react";
import Button from "../UI/Button";
import Dice from "./Dice";
import "./Overlay.css";

const Overlay = (props) => {
  const [num, setnum] = useState(0);

  const animate = (event) => {
    event.target.classList.add("push");
    setTimeout(() => {
      event.target.classList.remove("push");
    }, 400);
  };

  const resetAll = (event) => {
    animate(event);
    props.dispatch({ type: "RESET" });
    setnum(0);
  };

  const holdVal = (event) => {
    animate(event);
    props.dispatch({ type: "HOLD" });
    props.dispatch({ type: "CHECK-WINNER" });
  };

  const rollTheDice = (event) => {
    animate(event);
    const random = Math.floor(Math.random() * 6) + 1;
    setnum(random);
    if (random === 1) {
      props.dispatch({ type: "ONE" });
      return;
    }
    props.dispatch({ type: "CURRENT", value: random });
  };

  return (
    <div className="overlay">
      <Button name="🔃 New Game" onClickHandler={resetAll} />

      <Dice num={num} />

      <div className="game-controls">
        <Button
          name="🎲 Roll Dice"
          onClickHandler={rollTheDice}
          disabled={props.state.foundWinner}
        />

        <Button
          name="📥 Hold"
          onClickHandler={holdVal}
          disabled={props.state.foundWinner}
        />
      </div>
    </div>
  );
};

export default Overlay;
