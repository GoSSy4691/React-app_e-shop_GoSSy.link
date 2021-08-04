import axios from 'axios';

let allMenu = [];

function getMenuItems(renderSiteDom) {
  if (allMenu.length === 0) {
    axios.get('https://zloi.space/restaurant/api/shops').then((res) => {
      allMenu = res.data[0];
      renderSiteDom();
    })
      .catch(() => {
        console.log('error get menu');
      });
  }
  return allMenu;
}

export default getMenuItems;