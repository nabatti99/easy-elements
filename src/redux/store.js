import { createStore, combineReducers } from "redux";

import musicReducer from "./Music/reducer";

const rootReducer = combineReducers({
  music: musicReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;