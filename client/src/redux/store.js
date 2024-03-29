import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initailState = {};

const middleware = [thunk];
let store
if (process.env.NODE_ENV === 'production') {
  store = createStore(
    rootReducer ,
    initailState,
    compose(
      applyMiddleware(...middleware)
    )
  );
} else {
  store = createStore(
    rootReducer ,
    initailState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}


export default store;
