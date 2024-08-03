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
  const { setSelectedMode, connectionId, setRoom, player2Id, room, selectedMode } = useWebsocket(`${VITE_API_URL}/ws`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mode) navigate("/");
  }, [mode])

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value) && e.target.value.length < 7) setCodeUnput(e.target.value);
  }

  const roomJoinHandler = () => {
    setRoom(codeInput);
  }

  const modeSelectHandler = (m: ConnectionModes) => {
    return () => setSelectedMode(m)
  };

  return (
    <LayoutBox title="THE PIG GAME">
      <h3>Mode Selected: Online</h3>
      <div className={classes["mode_box"]}>
        {selectedMode === ConnectionModes.CreateRoom && !player2Id ? <>
          <p>{!room ? `Creating Room...` : 'Room Created! Enter below Code in other Website to join room'}</p>
          {room ? <h1>{room}</h1> : null}
        </> : null}
        {selectedMode === ConnectionModes.JoinRoom && !player2Id ? <>
          <p>Enter Room Code below to Join Room</p>
          <input value={codeInput} onChange={handleCodeInputChange} className={classes["code-input"]} />
          {codeInput.length === 6 ? <Button name="Join Room" onClickHandler={roomJoinHandler} /> : null}
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
        {connectionId && player2Id ? <><div style={{
          marginBottom: "1rem"
        }}>
          <p>Your ID: {connectionId}</p>
          <p>Opponent ID: {player2Id}</p>
        </div> 
        <Button name="Start Game" onClickHandler={() => {}}/>
        </>: null}
        <Button name="🔙 Go Back" onClickHandler={() => navigate("/")} />
      </div>
      <p style={{
        alignSelf: "flex-end",
        fontSize: "small"
      }}>Connection ID: {connectionId || "Offline"}</p>
    </LayoutBox>
  );
}
