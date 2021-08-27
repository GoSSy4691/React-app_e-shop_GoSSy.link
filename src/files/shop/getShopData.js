import axios from "axios";

let allData = [];

export default async function getShopData() {
  if (allData.length === 0) {
    await axios
      .get("https://zloi.space/restaurant/api/shops")
      .then((res) => {
        allData = res.data;
        return allData;
      })
      .catch(() => {
        console.log("error get menu");
      });
  }
  return allData;
}
