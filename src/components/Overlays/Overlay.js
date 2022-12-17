import React, { useState } from "react";
import Button from "../UI/Button";
import Dice from "./Dice";
import "./Overlay.css";

const Overlay = (props) => {
  const [num, setnum] = useState(0);
  const [rollState, setRollState] = useState("🎲 Roll Dice");

  const turnOf = props.turnOf;

  const resetAll = () => {
    console.log("new Game");
  };

  const holdVal = () => {
    console.log("holding");
  };

  const rollTheDice = () => {
    setRollState("🎲 Rolling...");
    setTimeout(() => {
      const random = (Math.floor(Math.random() * 100000) % 6) + 1;
      setnum(random);
      setRollState("🎲 Roll Dice");
      props.switchTurn(turnOf === 1 ? 2 : 1);
    }, 800);
  };

  return (
    <div className="overlay">
      <Button name="🔃 New Game" onClickHandler={resetAll} />
      <Dice num={num} />
      <div className="game-controls">
        <Button
          name={rollState}
          onClickHandler={rollTheDice}
          disabled={rollState === "🎲 Rolling..." ? true : false}
        />
        <Button name="📥 Hold" onClickHandler={holdVal} />
      </div>
    </div>
  );
};

export default Overlay;
