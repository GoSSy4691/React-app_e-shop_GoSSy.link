import axios from 'axios';

let allMenu = [];


//функция должна возвращать промисс , не должна вызывать функцию рендера
export default function getMenuItems(renderSiteDom) { //вот так тоже можно
  if (allMenu.length === 0) {
    axios.get('https://zloi.space/restaurant/api/shops')
      .then((res) => {
        allMenu = res.data[0].menu;
        renderSiteDom();
      })
      .catch(() => {
        console.log('error get menu');
      });
  }
  return allMenu;
}