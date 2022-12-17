import "./Dice.css";

const Dice = (props) => {
  return <img src={`dice/${props.num}.svg`} alt={`${props.num}`} />;
};

export default Dice;
