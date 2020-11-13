import React from "react";
import ReactDOM from "react-dom";
import App from "../../client/components/App";
import { Provider } from 'react-redux';
// import store from "../../client/store";
import "./index.css";

import { Store } from 'webext-redux';
const store = new Store();

store.ready().then(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.querySelector("#root")
)});

