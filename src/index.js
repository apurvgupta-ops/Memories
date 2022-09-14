import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { compose, applyMiddleware, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import thunk from "redux-thunk";

import reducers from "./Redux/Reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
