import React, {Component} from "react";

class Demo extends Component {
  render() {
    const {onAdd, onDe, value} = this.props;
    return (
      <div>
        <h2>{value}</h2>
        <button onClick={onAdd}>+</button>
        <button onClick={onDe}>-</button>
      </div>
    );
  }
}

export default Demo;