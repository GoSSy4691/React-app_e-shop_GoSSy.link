import axios from "axios";
import render from "../render.js";
import "./windowList.css"
import closeButton from "../files/closeButton.png"

let toDos = [];

export function getToDos() {
  stateButton = false
  axios.get("https://jsonplaceholder.typicode.com/todos/")
    .then((res) => {
      toDos = res.data;
      render()
    })
    .catch(() => {
      alert("error get list")
    })
}

export function getList() {
  let list = toDos.map(p => <li key={Math.random()} className={"list"}>{p.title}</li>);
  return <div className={"form-popup"}>
      <img src={closeButton} className={"closeButton"} alt={"closeButtonInToDoList"}/>
    <form className={"form-container"}>{list}</form>
  </div>
}

let stateButton = true;

export function listButton() {
  if (stateButton) {
    return (
      <button onClick={getToDos} className={"open-button"}> Get list </button>
    );
  } else {
    return (getList());
  }
}