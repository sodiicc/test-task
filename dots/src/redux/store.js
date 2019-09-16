import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";
import {mainSaga, mainReducer} from "./reducer";


/////// reducer/////////////

const reducer = combineReducers({
  settings: mainReducer
});

///////// root saga/////////

function* rootSaga() {
  yield all([
    mainSaga()
  ]);
}

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));
saga.run(rootSaga);

export default store;