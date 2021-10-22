import axios from "axios";

//TO DO Promise.all()
async function getBothCursor() {
  let cursorAuto = null;
  axios
    .get("https://cdn.custom-cursor.com/db/4130/32/arrow2402.png", {
      responseType: "arraybuffer",
    })
    .then((res) => {
      let blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });
      cursorAuto = URL.createObjectURL(blob);
    });
  let cursorPointer = null;
  await axios
    .get("https://cdn.custom-cursor.com/db/4129/32/arrow2402.png", {
      responseType: "arraybuffer",
    })
    .then((res) => {
      let blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });
      cursorPointer = URL.createObjectURL(blob);
    });
  return { cursorAuto, cursorPointer };
}

export default getBothCursor;
