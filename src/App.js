import logo from './files/rotateIt.png';
import './App.css';
import laser from './files/laser.png';

function makeFire() {
  let img = document.getElementById(13);
  let fire = document.createElement('img');
  fire.src = laser;
  fire.className = "image2";
  fire.alt = "lasers";
  img.append(fire);
  setTimeout(() => {
    fire.remove()
  }, 1000);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="parent" id={13}>
          <img src={logo} className="image1" alt="goose"/>
        </div>
        <p className={"App-header2"}>
          It goose TIME
          &nbsp;
          <button onClick={makeFire}>
            Activate Lasers
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
