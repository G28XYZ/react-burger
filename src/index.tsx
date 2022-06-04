import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { StoreProvider } from "./services/StoreProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
