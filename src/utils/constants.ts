import defaultImage from "../images/transparency.png";

export const address = "https://norma.nomoreparties.space/api";
export const wssAddressOrdersAll = "wss://norma.nomoreparties.space/orders/all";
export const wssAddressOrders = "wss://norma.nomoreparties.space/orders";

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

export const structureNames = [
  ["calories", "Калории, ккал"],
  ["proteins", "Белки, г"],
  ["fat", "Жиры, г"],
  ["carbohydrates", "Углеводы, г"],
];
