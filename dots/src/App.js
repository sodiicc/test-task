import React from "react";
import "./App.css";
import GameField from "./components/GameField";
import {Provider} from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <GameField />
    </div>
    </Provider>
  );
}

export default App;
