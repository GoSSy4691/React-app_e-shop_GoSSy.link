import axios from "axios";

const getCursorAuto = axios.get(
  "https://cdn.custom-cursor.com/db/4130/32/arrow2402.png",
  {
    responseType: "arraybuffer",
  }
);

const getCursorPointer = axios.get(
  "https://cdn.custom-cursor.com/db/4129/32/arrow2402.png",
  {
    responseType: "arraybuffer",
  }
);

export default function getBothCursor() {
  return Promise.all([getCursorAuto, getCursorPointer])
    .then((res) => {
      // console.log(res);
      let blobAuto = new Blob([res[0].data], {
        type: res[0].headers["content-type"],
      });
      let cursorAuto = URL.createObjectURL(blobAuto);
      let blobPointer = new Blob([res[1].data], {
        type: res[1].headers["content-type"],
      });
      let cursorPointer = URL.createObjectURL(blobPointer);
      return { cursorAuto, cursorPointer };
    })
}