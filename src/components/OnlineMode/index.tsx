import Button from "../Local/Button";
import classes from "./OnlineMode.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Mode, modeSelected } from "../../store/slice";
import LayoutBox from "../Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OnlineMode() {
  const mode = useAppSelector(state => state.session.mode);
  const navigate = useNavigate();

  useEffect(() => {
    if(!mode) navigate("/")
  },[mode])
  const dispatch = useAppDispatch();

  const modeSelectHandler = (m: Mode) => {
    return () => dispatch(modeSelected(m));
  };

  return (
    <LayoutBox title="THE PIG GAME">
      <h3>Mode Selected: Online</h3>
      <div className={classes["mode_box"]}>
        <Button
          name="Create Room"
          onClickHandler={modeSelectHandler(Mode.Local)}
        //   disabled={props.state.foundWinner}
        />
        <Button
          name="Join Room"
          onClickHandler={modeSelectHandler(Mode.Online)}
        />
        <Button name="🔙 Go Back" onClickHandler={() => navigate("/")}/>
      </div>
    </LayoutBox>
  );
}
