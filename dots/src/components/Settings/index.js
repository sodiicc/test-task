import React from "react";
import SetName from "./SetName";
import PlayBtn from "./PlayBtn";
import SetDifficulty from "./SetDifficulty";
import { connect } from "react-redux";
import {
  setName,
  setPlaying,
  setDifficulty,
  setBtnText,
  setFieldGrid
} from "../../redux/reducer";

const mapStateToProps = state => {
  console.log("state", state);
  return {
    name: state.settings.userName,
    btnText: state.settings.btnText,
    difficulty: state.settings.difficulty,
    fieldSize: state.settings.settings.field
  };
};

const Settings = connect(
  mapStateToProps,
  { setName, setDifficulty, setPlaying, setBtnText, setFieldGrid }
)(props => {
  return (
    <div>
      <SetDifficulty
        setDifficulty={props.setDifficulty}
        difficulty={props.difficulty}
      />
      <SetName setName={props.setName} />
      <PlayBtn
        btnText={props.btnText}
        setPlaying={props.setPlaying}
        setBtnText={props.setBtnText}
        setFieldGrid={props.setFieldGrid}
        fieldSize={props.fieldSize}
      />
    </div>
  );
});

export default Settings;
