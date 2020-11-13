import React from "react";
import ReactDOM from "react-dom";
import App from "../client/components/App";
import { Provider } from 'react-redux';
import store from "../client/store";
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
