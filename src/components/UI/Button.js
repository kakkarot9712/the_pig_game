import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type="button"
      className={classes.btn}
      disabled={props.disabled}
      onClick={props.onClickHandler}
    >
      {props.name}
    </button>
  );
};

export default Button;
