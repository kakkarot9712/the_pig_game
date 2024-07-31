import Button from "../Local/Button";
import classes from "./OnlineMode.module.css";
import { useAppSelector } from "../../store/hooks";
import LayoutBox from "../Layout";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useWebsocket from "../hooks/useWebsocket";
import { ConnectionModes } from "../../types/ws";

// type message struct {
// 	Type string
// 	Data string
// 	Room string
// }

// {"Type":"PONG","Data":"Connection Working","Room":""}
const { VITE_API_URL } = import.meta.env;

export default function OnlineMode() {
  const mode = useAppSelector(state => state.session.mode);
  const {setSelectedMode} = useWebsocket(`${VITE_API_URL}/ws`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mode) navigate("/")
  }, [mode])

  const modeSelectHandler = (m: ConnectionModes) => {
    return () => setSelectedMode(m)
  };

  return (
    <LayoutBox title="THE PIG GAME">
      <h3>Mode Selected: Online</h3>
      <div className={classes["mode_box"]}>
        <Button
          name="Create Room"
          onClickHandler={modeSelectHandler(ConnectionModes.CreateRoom)}
        //   disabled={props.state.foundWinner}
        />
        <Button
          name="Join Room"
          onClickHandler={modeSelectHandler(ConnectionModes.JoinRoom)}
        />
        <Button name="🔙 Go Back" onClickHandler={() => navigate("/")} />
      </div>
    </LayoutBox>
  );
}
