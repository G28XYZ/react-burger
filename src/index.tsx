import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { store } from "./services/store";

// const preloadedState = {
//   loading: false,
//   ingredients: [],
//   sortedIngredients: {},
//   modal: {
//     title: "",
//     ingredientInModal: null,
//     isOpen: false,
//   },
//   order: {
//     name: "",
//     list: [],
//     bun: {
//       _id: "",
//       name: "",
//       type: "",
//       proteins: 0,
//       fat: 0,
//       carbohydrates: 0,
//       calories: 0,
//       price: 0,
//       image: "",
//       image_mobile: "",
//       image_large: "",
//       __v: 0,
//     },
//     id: "",
//     totalPrice: 0,
//     registerOrder: false,
//   },
// };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
