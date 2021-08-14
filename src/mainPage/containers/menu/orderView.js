import s from './orderView.module.css';

import foodPolicy from '../../../files/img/foodPolicy.jpg';

function View() {
  return (
    <div className={s.divContainer}>
      <img
        alt={'foodPolicy'}
        src={foodPolicy}
      />
    </div>
  );
}

export default View;