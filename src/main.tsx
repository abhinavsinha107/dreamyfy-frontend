import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./provider/SocketProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <ToastContainer />
          <App />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
