import classes from "./Button.module.css";

const Button = (props: {
  disabled?: boolean;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
}) => {
  return (
    <button
      type="button"
      disabled={props.disabled}
      className={classes.btn}
      onClick={props.onClickHandler}
    >
      {props.name}
    </button>
  );
};

export default Button;
