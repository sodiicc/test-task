import React from "react";

let makeArray = size => {
  let array = [];
  for (let i = 0; i < size; i++) {
    let arr = [];
    for (let j = 0; j < size; j++) {
      arr.push("fieldItem");
    }
    array.push(arr);
  }
  return array;
};

const PlayBtn = props => {
  const handleClick = () => {
    props.setPlaying(true);
    props.setBtnText("Play again");
    props.setFieldGrid(makeArray(props.fieldSize));
  };

  return <button onClick={handleClick}>{props.btnText}</button>;
};

export default PlayBtn;
