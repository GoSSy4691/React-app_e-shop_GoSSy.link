import axios from 'axios';
import render from '../../render';

let allMenu = [];

function getMenuItems() {
  if (allMenu.length === 0) {
    axios.get('https://zloi.space/restaurant/api/shops').then((res) => {
      allMenu = res.data[0];
      render();
    })
      .catch(() => {
        console.log('error get menu');
      });
  }
  return allMenu;
}

export default getMenuItems;