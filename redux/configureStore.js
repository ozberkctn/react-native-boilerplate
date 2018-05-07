import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";

// Note: this API requires redux@>=3.1.0

const middleware = [
  process.env.NODE_ENV !== "production" && logger,
  thunk
].filter(Boolean);

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  return store;
}
