import rotateIt from '../../../files/img/logo-goose.png';
import laser from '../../../files/img/laser.png';
import './gooses.css';

let buffer = [];

function makeFire(render) {
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

function LogoImg(props) {
  if (buffer.length > 0) {
    return (
      <div>
        <img onClick={() => makeFire(props.renderSiteDom)}
             src={rotateIt}
             className={'mainGoose_view'}
             alt={'logo'}
             title={'don\'t click'}/>
        {buffer.map(p => <img src={p.src} className={p.className} alt={p.alt} key={p.key}/>)}
      </div>
    );
  }
  return (
    <div>
      <img src={rotateIt}
           className={'mainGoose_view'}
           onClick={() => makeFire(props.renderSiteDom)}
           alt={'logo'}
           title={'don\'t click'}/>
    </div>
  );

}

export default LogoImg;