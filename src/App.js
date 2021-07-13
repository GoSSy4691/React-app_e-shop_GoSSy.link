import "./App.css";
// import {makeFire} from "./logoGoose/logoImage.js"
import {logoImg} from "./logoGoose/logoImage.js";
import showList from "./axios/toDoList.js";

function App() {
  return (
    <div className="App">
      <div className="Top-bar">
        {logoImg()}
      </div>
      <header className="App-header">
        <div className={"App-header2"}>
          It goose TIME
          &nbsp;
          {/*<button onClick={makeFire} >*/}
          {/*  Activate Lasers*/}
          {/*</button>*/}
          <div>
            {showList()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
