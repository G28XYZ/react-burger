import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { compose, createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { IState } from "./utils/types";
import { store } from "./services/store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
