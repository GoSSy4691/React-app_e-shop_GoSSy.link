import axios from 'axios';
import render from '../../../render.js';
import s from './windowList.module.css'
import closeButton from '../../../files/img/closeButton.png'

let toDos = [];
let stateButton = 'close';

function getToDos() {
  if (toDos.length > 0) {
    stateButton = 'open';
    render()
  } else {
    stateButton = 'wait';
    render();
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then((res) => {
        toDos = res.data;
        stateButton = 'open';
        render();
      })
      .catch(() => {
        alert('error get list');
      });
  }
}

function getList() {
  let list = toDos.map(p => <li key={Math.random()} className={s.list}>{p.title}</li>);
  return <div className={s.formPopup}>
    <img
      onClick={closeList}
      src={closeButton}
      className={s.closeButton}
      alt={'closeButtonInToDoList'}
      title={'Close'}
    />
    <form className={s.formContainer}>{list}</form>
  </div>
}

function closeList() {
  stateButton = 'close'
  render()
}

function ShowList() {
  if (stateButton === 'close') {
    if (toDos.length > 0) {
      return (<button onClick={getToDos} className={s.openButton}> Get list </button>);
    } else
      return (<button onClick={getToDos} className={s.openButton}> Get list </button>);
  }
  if (stateButton === 'wait') {
    return (
      <button className={s.openButton}> Wait... </button>
    )
  }
  if (stateButton === 'open') {
    return (getList());
  }
}

export default ShowList