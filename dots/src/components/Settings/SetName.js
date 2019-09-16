import React from "react";

const SetName = props => {
  console.log("props", props.name);

  const handleChange = e => {
    props.setName(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Enter your name"
      value={props.name}
      onChange={handleChange}
    />
  );
};

export default SetName;
