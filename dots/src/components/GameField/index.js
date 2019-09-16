import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FieldItem from "./FieldItem";
import LeaderBoard from "../LeaderBoard";
import Settings from "../Settings";
import { connect } from "react-redux";
import {
  getWinners,
  getSettings,
  addWinner,
  setMessage,
  setBtnText,
  setDifficulty,
  setPlaying,
  setFieldGrid
} from "../../redux/reducer";

let userScore = 0;
let compScore = 0;
let isClick = false;

const mapStateToProps = state => {
  console.log("statdfsde", state);
  return {
    delay: state.settings.settings.delay,
    fieldSize: state.settings.settings.field,
    message: state.settings.message,
    fieldGrid: state.settings.fieldGrid,
    isPlaying: state.settings.isPlaying,
    difficulty: state.settings.difficulty,
    userName: state.settings.userName,
    winners: state.settings.winners
  };
};

///COMPONENT ////////////////////////////

const GameField = connect(
  mapStateToProps,
  {
    getWinners,
    getSettings,
    addWinner,
    setDifficulty,
    setMessage,
    setBtnText,
    setPlaying,
    setFieldGrid
  }
)(props => {
  const randomFunc = () => {
    return Math.ceil(Math.random() * Math.pow(fieldSize, 2));
  };
  const moreThenHalf = () => {
    return Math.floor(Math.pow(fieldSize, 2) / 2) + 1;
  };

  let delay = props.delay;
  let fieldSize = props.fieldSize;
  let message = props.message.text;

  let [color, setColor] = useState("#eee");
  let [step, setStep] = useState(0);
  let [randomArray, setRandomArray] = useState([]);
  let [random, setRandom] = useState(randomFunc());

  let arrayField = [];
  for (let i = 1; i <= Math.pow(fieldSize, 2); i++) {
    arrayField.push(
      <FieldItem
        fieldSize={fieldSize}
        setFieldGrid={props.setFieldGrid}
        grid={props.fieldGrid}
        isPlaying={props.isPlaying}
        color={color}
        random={random}
        key={i}
        name={i}
      />
    );
  }

  useEffect(() => {
    props.getWinners();
    props.getSettings(props.difficulty);
    if (props.isPlaying) {
      setColor("#eee");
      setTimeout(() => {
        let randomItem = randomFunc();

        while (randomArray.includes(randomItem)) {
          randomItem = randomFunc();
        }

        setRandomArray([...randomArray, randomItem]);
        setRandom(randomItem);
        if (userScore < moreThenHalf() && compScore < moreThenHalf()) {
          setColor("blue");
          setTimeout(() => {
            if (isClick) {
              userScore += 1;
            } else {
              compScore += 1;
              setColor("pointDown");
            }
            setRandom(null);
            setStep(s => s + 1);
            isClick = false;
          }, delay);
        } else {
          let newDate = new Date();
          let hours = newDate.getHours();
          let mins = newDate.getMinutes();
          if (hours < 10) {
            hours = "0" + hours;
          }
          if (mins < 10) {
            mins = "0" + mins;
          }
          let date =
            newDate.getFullYear() +
            "/" +
            (1 + newDate.getMonth()) +
            "/" +
            newDate.getDate() +
            "/" +
            hours +
            ":" +
            mins;

          let newWinner;

          if (userScore >= moreThenHalf()) {
            props.setPlaying(false);
            userScore = 0;
            compScore = 0;
            setRandomArray([]);
            newWinner = { name: props.userName, date };

            props.setMessage({ color: "green", text: "YOU WIN" });
          } else if (compScore >= moreThenHalf()) {
            props.setMessage({ color: "red", text: "YOU LOSE" });
            newWinner = { name: "Computer AI", date };
          } else {
            props.setMessage({ color: "brown", text: "DRAW" });
            newWinner = { name: "DRAW", date };
          }
          props.addWinner(newWinner);

          props.setBtnText("Play again");
        }
      }, 700 + randomFunc() * 15);
    }
  }, [step, props.isPlaying]);

  const handleClick = e => {
    if (e.target.id) {
      if (+e.target.id === random) {
        e.target.classList.add("pointUp");
        isClick = true;
      }
    }
  };

  let winners = props.winners.map(item => {
    return (
      <div key={Math.random()}>
        <LeaderBoard
          winnerName={item.name !== "" ? item.name : "noname"}
          winnerDate={item.date}
        />
      </div>
    );
  });

  return (
    <GameStyle>
      <div className="mainField">
        <Settings />
        <h1 style={{ color: props.message.color }}>{message}</h1>
        <Field
          style={{
            width: `${60 * fieldSize}px`,
            height: `${60 * fieldSize}px`
          }}
          onClick={handleClick}
        >
          {arrayField}
        </Field>
        <h2> User score {userScore}</h2>
        <h2>Computer AI score {compScore}</h2>
      </div>
      <div className="winnerBoard">
        <h2>Leader Board</h2>
        {winners}
      </div>
    </GameStyle>
  );
});

const Field = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  border: 2px blue solid;

  .fieldItem {
    background-color: #eee;
    width: 58px;
    height: 58px;
    border: 1px green solid;
  }
  .blue {
    background-color: blue;
  }

  .pointUp {
    background-color: green;
  }
  .pointDown {
    background-color: red;
  }
`;

const GameStyle = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;

  .winnerBoard {
    width: 300px;
    margin-left: 150px;
    height: 700px;
    overflow: auto;
  }
  .winner {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    padding: 10px;
    background-color: #cfc;
    font-weight: 700;
  }
`;

export default GameField;
