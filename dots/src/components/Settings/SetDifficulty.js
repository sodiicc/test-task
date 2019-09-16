import React from "react";

const SetDifficulty = props => {
  console.log("propsDIFF", props);

  const handleChange = e => {
    props.setDifficulty(e.target.value);
  };

  return (
    <select value={props.difficulty} onChange={handleChange}>
      <option value="easy">easy</option>
      <option value="normal">normal</option>
      <option value="hard">hard</option>
      <option value="nightmare">nightmare</option>
    </select>
  );
};

export default SetDifficulty;
