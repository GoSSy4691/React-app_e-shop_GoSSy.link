import axios from "axios";
import render from "../render.js";
import "./windowList.css"

let toDos = [];

export function getToDos() {
  stateButton = false
  axios.get('https://jsonplaceholder.typicode.com/todos/')
    .then((res) => {
      toDos = res.data;
      render()
    })
    .catch(() => {
      console.log("error!!")
    })
}

export function getList() {
  let list = toDos.map(p => <li key={Math.random()}>{p.title}</li>);
  return <div className={"form-popup"}>
    <form className={"form-container"}>{list}</form>
  </div>
}

let stateButton = true;

export function listButton() {
  // debugger
  console.log("workbitch")
  if (stateButton) {
    // return (<div className={"form-popup"}>
    return (
      <button onClick={getToDos} className={'open-button'}> Get list </button>
    );
  } else {
    return (getList());
  }
}