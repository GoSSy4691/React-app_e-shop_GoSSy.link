import axios from "axios";

let allMenu = [];

export default async function getMenuItems() {
  if (allMenu.length === 0) {
    await axios
      .get("https://zloi.space/restaurant/api/shops")
      .then((res) => {
        allMenu = res.data[0].menu;
        return allMenu;
      })
      .catch(() => {
        console.log("error get menu");
      });
  }
  return allMenu;
}
