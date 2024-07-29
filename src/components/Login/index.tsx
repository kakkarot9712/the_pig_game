import Button from "../Local/Button";
import classes from "./Login.module.css";
import { useAppDispatch } from "../../store/hooks";
import { Mode, modeSelected } from "../../store/slice";
import LayoutBox from "../Layout";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modeSelectHandler = (m: Mode) => {
    return () => {
      dispatch(modeSelected(m));
      if (m === Mode.Online) navigate("/play/online")
      else navigate("/play/local")
    }
  };

  return (
    <LayoutBox title="THE PIG GAME">
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
    </LayoutBox>
  );
}
