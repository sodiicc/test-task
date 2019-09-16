import React from "react";

//// class component for REF /////////////

class FieldItem extends React.Component {
  constructor(props) {
    super(props);
    this.field = React.createRef();
  }

  render() {
    if (this.field.current) {
      if (this.props.name === this.props.random)
        this.field.current.classList.add(this.props.color);
    }
    return (
      <div ref={this.field} className={`fieldItem`} id={this.props.name}></div>
    );
  }
}

export default FieldItem;
