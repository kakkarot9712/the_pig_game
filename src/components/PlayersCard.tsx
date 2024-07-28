import "./PlayersCard.css";
import { Turn } from "../store/slice";

const PlayerCards = (props: {
  pid: Turn;
  score: number;
  currentVal: number;
  winner: boolean;
  active: boolean;
}) => {
  debugger;
  const winnerClasses = `${
    props.pid === Turn.Player1 ? "winner-1" : "winner-2"
  } ${props.winner ? "" : "hidden"}`;
  const classes = `player__card ${props.active ? "active" : ""}`;
  return (
    <div className={classes}>
      <div className={winnerClasses}>
        <p>Winner!</p>
      </div>
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
