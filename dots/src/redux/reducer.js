import { put, take, all } from "redux-saga/effects";

//////////// action types////////////
const GET_WINNERS = "GET_WINNERS";
const GET_SETTINGS = "GET_SETTINGS";
const SET_WINNERS = "SET_WINNERS";
const SET_SETTINGS = "SET_SETTINGS";
const ADD_WINNER = "ADD_WINNER";
const SET_NAME = "SET_NAME";
const SET_MESSAGE = "SET_MESSAGE";
const SET_BTN_TEXT = "SET_BTN_TEXT";
const SET_DIFFICULTY = "SET_DIFFICULTY";
const SET_PLAYING = "SET_PLAYING";
const SET_FIELD_GRID = "SET_FIELD_GRID";

///////////// action creators ////////////////
export const getWinners = () => {
  return {
    type: GET_WINNERS
  };
};
export const getSettings = payload => {
  return {
    type: GET_SETTINGS,
    payload
  };
};
export const addWinner = payload => {
  return {
    type: ADD_WINNER,
    payload
  };
};
export const setName = payload => {
  return {
    type: SET_NAME,
    payload
  };
};
export const setMessage = payload => {
  return {
    type: SET_MESSAGE,
    payload
  };
};
export const setBtnText = payload => {
  return {
    type: SET_BTN_TEXT,
    payload
  };
};
export const setDifficulty = payload => {
  return {
    type: SET_DIFFICULTY,
    payload
  };
};
export const setPlaying = payload => {
  return {
    type: SET_PLAYING,
    payload
  };
};
export const setFieldGrid = payload => {
  return {
    type: SET_FIELD_GRID,
    payload
  };
};

///////sagas ///////////

function* getWinnersSaga() {
  while (true) {
    yield take(GET_WINNERS);
    const req = yield fetch("/winners");
    const res = yield req.json();
    yield put({ type: SET_WINNERS, payload: res.sort((a, b) => b - a) });
  }
}

function* addWinnerSaga() {
  while (true) {
    const { payload } = yield take(ADD_WINNER);
    yield fetch("/add_winner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  }
}

function* getSettingsSaga() {
  while (true) {
    const { payload } = yield take(GET_SETTINGS);
    const req = yield fetch("/settings");
    const res = yield req.json();
    yield put({ type: SET_SETTINGS, payload: res[payload] });
  }
}

////////////////// reducer//////////////

let startState = {
  winners: [],
  settings: { field: 5, delay: 700 },
  userName: "",
  message: { color: "black", text: "try to win" },
  btnText: "Play",
  difficulty: "easy",
  isPlaying: false,
  fieldGrid: []
};

export function mainReducer(state = startState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_WINNERS:
      return { ...state, winners: payload };
    case SET_SETTINGS:
      return { ...state, settings: payload };
    case SET_NAME:
      return { ...state, userName: payload };
    case SET_MESSAGE:
      return { ...state, message: payload };
    case SET_BTN_TEXT:
      return { ...state, btnText: payload };
    case SET_DIFFICULTY:
      return { ...state, difficulty: payload };
    case SET_PLAYING:
      return { ...state, isPlaying: payload };
    case SET_FIELD_GRID:
      return { ...state, fieldGrid: payload };
    default:
      return state;
  }
}

////////////// root saga////////////
export function* mainSaga() {
  yield all([getWinnersSaga(), getSettingsSaga(), addWinnerSaga()]);
}
