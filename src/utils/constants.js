import defaultImage from "../images/transparency.png";

export const address = "https://norma.nomoreparties.space/api";

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const initialBun = {
  _id: "",
  name: "Переместите сюда булку",
  type: "",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: defaultImage,
  image_mobile: "",
  image_large: "",
  __v: 0,
};
