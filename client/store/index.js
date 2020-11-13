// import redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {wrapStore} from 'webext-redux'

//import reducers
import championsReducer from "./championsReducer";

const reducer = combineReducers({
    champions: championsReducer,
});

const initialState = {
    champions: [],
}

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger( { collapsed: true }))
);

const store = createStore(reducer, initialState, middleware);

wrapStore(store);

export default store;
