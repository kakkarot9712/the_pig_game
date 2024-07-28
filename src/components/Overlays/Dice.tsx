import "./Dice.css";

const Dice = (props: { num: number }) => {
  return <img src={`dice/${props.num}.svg`} alt={`${props.num}`} />;
};

export default Dice;
