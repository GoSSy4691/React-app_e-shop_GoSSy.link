import logo from './files/rotateIt.png';
import './App.css';
import laser from './files/laser.png';

function makeDog(e) {
  e.target.setAttribute( "src", laser);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="cat" onClick={makeDog}/>
        {/*if remove 'className="App-logo"' function makeDog work*/}
        <p>
          It goose TIME
          &nbsp;
          <button onClick={""}>
            Activate Lasers
          </button>
          <button
              onClick={makeDog}
          >
            Test button
          </button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start
        </a>
      </header>
    </div>
  );
}

export default App;
