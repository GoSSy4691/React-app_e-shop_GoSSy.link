import './App.css';
import ShowList from './axios/toDoList';
import Welcome from './mainPage/welcome';
import TestPage from './mainPage/testPage';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './mainPage/header/header';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <div className='Top-bar'>
        <Header/>
      </div>
      <header className='App-header'>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/test_page' component={TestPage}/>
        <div>
          <ShowList/>
        </div>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
