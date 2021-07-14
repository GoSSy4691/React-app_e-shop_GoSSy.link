import "./App.css";
// import {makeFire} from "./logoGoose/logoImage.js"
import logoImg from "./logoGoose/logoImage.js";
import showList from "./axios/toDoList.js";

function App() {
  return (
    <div className="App">
      <div className="Top-bar">
        {logoImg()}
      </div>
      <header className="App-header">
        <div className={"App-header2"}>
          It's goose TIME
          <div>
            {showList()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
