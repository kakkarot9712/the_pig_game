import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import { useAppSelector } from "./store/hooks";
import { Mode } from "./store/slice";

function App() {
  // const mode = useSelector<S>(state => state.session.mode)
  const mode = useAppSelector((state) => state.session.mode);

  return (
    <div className="App">
      {mode === Mode.Local ? (
        <Main />
      ) : mode === Mode.Online ? (
        <></>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
