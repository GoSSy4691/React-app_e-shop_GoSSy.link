import rotateIt from "../files/rotateIt.png";
import laser from "../files/laser.png";
import render from "../render.js";

let buffer = [
    {
        src: rotateIt,
        className: "image1",
        alt: "goose",
        key: 1
    }
];

export function myImg() {
    return buffer.map(p => <img src={p.src} className={p.className} alt={p.alt} key={p.key}/>)
}

export function makeFire() {
    let blaster = {
        src: laser,
        className: "image2",
        alt: "lasers",
        key: Math.random()
    };
    buffer.push(blaster);
    render();
    setTimeout(() => {
        buffer.pop()
    }, 1000);
}