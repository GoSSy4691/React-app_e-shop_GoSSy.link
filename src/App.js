import './App.css';
import LogoImg from './logoGoose/logoImage.js';
import ShowList from './axios/toDoList';

function App() {
  return (
    <div className='App'>
      <div className='Top-bar'>
        <LogoImg/>
      </div>
      <header className='App-header'>
        <div className={'App-header2'}>
          It's goose TIME
          <div>
            <ShowList/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
