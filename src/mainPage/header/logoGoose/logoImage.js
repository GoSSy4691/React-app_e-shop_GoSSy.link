import rotateIt from '../../../files/img/logo-goose.png';
import laser from '../../../files/img/laser.png';
import render from '../../../render.js';
import './gooses.css';

let buffer = [];

function makeFire() {
  let blaster = {
    src: laser,
    className: 'lasers_view',
    alt: 'lasers',
    key: Math.random()
  };
  buffer.push(blaster);
  render();
  setTimeout(() => {
    buffer.pop();
  }, 1000);
}

function LogoImg() {
  if (buffer.length > 0) {
    return (
      <div>
        <img src={rotateIt} className={'mainGoose_view'} onClick={makeFire} alt={'logo'}/>
        {buffer.map(p => <img src={p.src} className={p.className} alt={p.alt} key={p.key}/>)}
      </div>
    );
  }
  return (
    <div>
      <img src={rotateIt} className={'mainGoose_view'} onClick={makeFire} alt={'logo'}/>
    </div>
  );

}

export default LogoImg;