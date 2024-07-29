import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./Alert.css";
import { Turn } from "../../../store/slice";

const Alert = (props: { alert: Turn | null }) => {
  const alertRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={alertRef}
      mountOnEnter
      unmountOnExit
      in={Boolean(props.alert)}
      timeout={3000}
      classNames={{
        enter: "open",
        enterActive: "open",
        enterDone: "",
      }}
    >
      <div className="alert" ref={alertRef}>
        <p>{`Game is ended, Winner is ${
          props.alert === Turn.Player1 ? "Player 1" : "Player 2"
        }!`}</p>
      </div>
    </CSSTransition>
  );
};

export default Alert;
