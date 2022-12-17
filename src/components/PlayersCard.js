import React from "react";
import "./PlayersCard.css";

const PlayerCards = (props) => {
  const classes = `player__card ${props.active ? "active" : ""}`;
  return (
    <div className={classes}>
      <div className="player__info">
        <h2 className="player__name">{"PLAYER " + props.pid}</h2>
        <h1>{props.score}</h1>
      </div>
      <div className="player__current-card">
        <p>CURRENT</p>
        <h2>{props.currentVal}</h2>
      </div>
    </div>
  );
};

export default PlayerCards;
