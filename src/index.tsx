import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "./index.css";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
