import "./App.css";
import {makeFire} from "./logoGoose/images.js"
import {myImg} from "./logoGoose/images.js";
import {getList, getToDos} from "./axios/toDoList.js";

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
          <button onClick={getToDos}>
            Get todos
          </button>
          </div>
        </div>
        <ul>
          {getList()}
        </ul>
      </header>
    </div>
  );
}

export default App;
