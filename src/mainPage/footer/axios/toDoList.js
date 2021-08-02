import axios from 'axios';
import s from './windowList.module.css'
import closeButton from '../../../files/img/closeButton.png'

let toDos = [];
let stateButton = 'close';

function getToDos(render) {
  if (toDos.length > 0) {
    stateButton = 'open';
    render()
  } else {
    stateButton = 'wait';
    render()
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then((res) => {
        toDos = res.data;
        stateButton = 'open';
        render()
      })
      .catch(() => {
        alert('error get list');
      });
  }
}

function getList(render) {
  let list = toDos.map(p => <li key={Math.random()} className={s.list}>{p.title}</li>);
  return <div className={s.formPopup}>
    <img
      onClick={() => closeList(render)}
      src={closeButton}
      className={s.closeButton}
      alt={'closeButtonInToDoList'}
      title={'Close'}
    />
    <form className={s.formContainer}>{list}</form>
  </div>
}

function closeList(render) {
  stateButton = 'close'
  render()
}

function ShowList(props) {
  if (stateButton === 'close') {return (<button onClick={() => getToDos(props.renderSiteDom)} className={s.openButton}> Get list </button>)}
  if (stateButton === 'wait') {return (<button className={s.openButton}> Wait... </button>)}
  if (stateButton === 'open') {return (getList(props.renderSiteDom))}
}

export default ShowList