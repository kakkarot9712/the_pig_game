import Button from "../Local/Button";
import classes from "./OnlineMode.module.css";
import { useAppSelector } from "../../store/hooks";
import LayoutBox from "../Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWebsocket from "../hooks/useWebsocket";
import { ConnectionModes } from "../../types/ws";

const { VITE_API_URL } = import.meta.env;

export default function OnlineMode() {
  const mode = useAppSelector(state => state.session.mode);
  const [codeInput, setCodeUnput] = useState("");
  const { setSelectedMode, isConnected, setRoom, isLoaing, isReady, room, selectedMode } = useWebsocket(`${VITE_API_URL}/ws`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mode) navigate("/");
  }, [mode])

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(+e.target.value) && e.target.value.length < 7) setCodeUnput(e.target.value);
  }

  const modeSelectHandler = (m: ConnectionModes) => {
    return () => setSelectedMode(m)
  };

  return (
    <LayoutBox title="THE PIG GAME">
      <h3>Mode Selected: Online</h3>
      <div className={classes["mode_box"]}>
        {selectedMode === ConnectionModes.CreateRoom && !isReady ? <>
          <p>{isLoaing ? `Creating Room...` : 'Room Created! Enter below Code in other Website to join room'}</p>
          {room ? <h1>{room}</h1> : null}
        </> : null}
        {selectedMode === ConnectionModes.JoinRoom ? <>
          <p>Enter Room Code below to Join Room</p>
          <input value={codeInput} onChange={handleCodeInputChange} className={classes["code-input"]} />
          <Button name="Join Room" onClickHandler={() => console.log("Joining...")} />
        </> : null}
        {!selectedMode ? <>
          <Button
            name="Create Room"
            onClickHandler={modeSelectHandler(ConnectionModes.CreateRoom)}
          //   disabled={props.state.foundWinner}
          />
          <Button
            name="Join Room"
            onClickHandler={modeSelectHandler(ConnectionModes.JoinRoom)}
          />
        </> : null}
        <Button name="🔙 Go Back" onClickHandler={() => navigate("/")} />
      </div>
      <p style={{
        alignSelf: "flex-end",
        fontSize: "small"
      }}>Connection Status: {isConnected ? "Online" : "Offline"}</p>
    </LayoutBox>
  );
}
