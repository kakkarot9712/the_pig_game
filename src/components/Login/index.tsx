import Button from "../UI/Button";
import classes from "./Login.module.css";
import { useAppDispatch } from "../../store/hooks";
import { Mode, modeSelected } from "../../store/slice";

export default function Login() {
  const dispatch = useAppDispatch();

  const modeSelectHandler = (m: Mode) => {
    return () => dispatch(modeSelected(m));
  };

  return (
    <div className={classes["login_box"]}>
      <h2>THE PIG GAME</h2>
      <br />
      <h3>Select Mode</h3>
      <div className={classes["mode_box"]}>
        <Button
          name="🌐 Local Two Player"
          onClickHandler={modeSelectHandler(Mode.Local)}
          //   disabled={props.state.foundWinner}
        />
        <Button
          name="🌏 Online Two Player"
          onClickHandler={modeSelectHandler(Mode.Online)}
        />
      </div>
    </div>
  );
}
