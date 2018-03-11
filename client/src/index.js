import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import scrum from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage
};
const store = createStore(persistReducer(persistConfig, scrum));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
