import "./App.css";
import {makeFire} from "./logoGoose/images.js"
import {myImg} from "./logoGoose/images.js";
import {listButton} from "./axios/toDoList.js";
import "./axios/windowList.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="parent">
          {myImg()}
        </p>
        <div className={"App-header2"}>
          It goose TIME
          &nbsp;
          <button onClick={makeFire} >
            Activate Lasers
          </button>
          <div>
            {listButton()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
