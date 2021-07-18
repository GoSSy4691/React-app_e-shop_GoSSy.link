import './App.css';
import ShowList from './axios/toDoList';
import {Route} from 'react-router-dom';
import Header from './mainPage/header/header';
import Home from './mainPage/home';
import Welcome from './mainPage/welcome';
import TestPage from './mainPage/testPage';

function App() {
  return (
    <div className='App'>
      <div className='Top-bar'>
        <Header/>
      </div>
      <header className='App-header'>
        <Route exact path='/' component={Home}/>
        <Route exact path='/welcome' component={Welcome}/>
        <Route exact path='/test_page' component={TestPage}/>
        <div>
          <ShowList/>
        </div>
      </header>
    </div>
  );
}

export default App;
