import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Input, Checkbox } from "antd";
import Styled from "styled-components";

const TodoList = ({ todos, onChecked, onRemove }) => {
  const Span = Styled.span`
    text-decoration: ${props => props.finished && "line-through"}
  `;
  return todos.map(({ id, value, finished }) => {
    return (
      <div key={id}>
        <Checkbox onChange={() => onChecked(id)} />
        <Span finished={finished}>{value}</Span>
        <span onClick={() => onRemove(id)}>X</span>
      </div>
    );
  });
};

class App extends Component {
  state = {
    todos: [],
    inputValue: ""
  };

  handleInput = e => {
    const val = e.target.value;
    this.setState({ inputValue: val });
  };
  handlePress = e => {
    const val = e.target.value;
    const { todos } = this.state;
    todos.push({
      id: Math.random(),
      value: val,
      finished: false
    });
    this.setState({ todos: todos, inputValue: "" });
  };

  handleChecked = key => {
    const { todos } = this.state;
    todos.forEach(item => {
      if (item.id === key) {
        item.finished = !item.finished;
      }
    });
    this.setState({ todos: todos });
  };

  handleRemove = key => {
    const { todos } = this.state;
    const index = todos.findIndex(item => item.id === key);
    todos.splice(index, 1);
    this.setState({ todos: todos });
  };

  render() {
    const { inputValue, todos } = this.state;
    return (
      <Div>
        <Input
          value={inputValue}
          onChange={this.handleInput}
          onPressEnter={this.handlePress}
        />
        <TodoList
          todos={todos}
          onChecked={key => this.handleChecked(key)}
          onRemove={key => this.handleRemove(key)}
        />
      </Div>
    );
  }
}

const Div = Styled.div`
  width: 800px;
  margin: 20px auto;
`;

ReactDOM.render(<App />, document.getElementById("app"));
