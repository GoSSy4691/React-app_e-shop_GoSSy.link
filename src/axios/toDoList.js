import axios from "axios";
import render from "../render.js";

let toDos = [];

export function getToDos() {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
        .then((res) => {
            toDos = res.data;
            render()
        })
        .catch(()=> {
            console.log("error!!")
        })
}

export function getList() {
    return toDos.map(p => <li key={Math.random()}>{p.title}</li>);
}
