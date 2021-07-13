import axios from "axios";
import render from "../render.js";
import "./windowList.css"
import closeButton from "../files/closeButton.png"

let toDos = [];
let stateButton = "close";

export function getToDos() {
  stateButton = "wait"
  render()
  axios.get("https://jsonplaceholder.typicode.com/todos/")
    .then((res) => {
      toDos = res.data;
      stateButton = "open"
      render()
    })
    .catch(() => {
      alert("error get list")
    })
}

export function getList() {
  let list = toDos.map(p => <li key={Math.random()} className={"list"}>{p.title}</li>);
  return <div className={"form-popup"}>
    <img
      onClick={closeList}
      src={closeButton}
      className={"closeButton"}
      alt={"closeButtonInToDoList"}
      title={"Close"}
    />
    <form className={"form-container"}>{list}</form>
  </div>
}

export function showList() {
  if (stateButton === "close") {
    return (
      <button onClick={getToDos} className={"open-button"}> Get list </button>
    );
  }
  if (stateButton === "wait") {
    return (
      <button className={"open-button"}> Wait... </button>
    )
  }
  if (stateButton === "open") {
    return (getList());
  }
}

function closeList() {
  stateButton = "close"
  render()
}
