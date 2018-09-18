import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Input, Checkbox } from "antd";
import Styled from "styled-components";
import { createStore, combineReducers } from "redux";
import Demo from "./containers/Demo";
import _ from "lodash";

const Div = Styled.div`
  width: 800px;
  margin: 20px auto;
`;

const TodoList = ({ todos, onChecked, onRemove }) => {
  const Span = Styled.span`
    text-decoration: ${props => props.finished && "line-through"}
  `;
  return todos.map(({ id, value, finished }) => {
    return (
      <div key={id}>
        <Checkbox checked={finished} onChange={() => onChecked(id)} />
        <Span finished={finished}>{value}</Span>
        <span onClick={() => onRemove(id)}>X</span>
      </div>
    );
  });
};

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DE_TODO": {
      const index = state.findIndex(item => item.id === action.payload);
      const newState = _.cloneDeep(state);
      newState.splice(index, 1);
      return newState;
    }
    case "CHECKED": {
      const newState = _.cloneDeep(state);
      newState.forEach(item => {
        if (item.id === action.payload) {
          item.finished = !item.finished;
        }
      });
      return newState;
    }
    default:
      return state;
  }
};
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "DE":
      return state - 1;
    default:
      return state;
  }
};

const allReducer = combineReducers({
  todos: todoReducer,
  counter: counterReducer
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  state = {
    inputValue: ""
  };

  handleInput = e => {
    const val = e.target.value;
    this.setState({ inputValue: val });
  };
  handlePress = e => {
    const val = e.target.value;
    store.dispatch({
      type: "ADD_TODO",
      payload: {
        id: Math.random(),
        value: val,
        finished: false
      }
    });
    this.setState({ inputValue: "" });
  };

  handleChecked = key => {
    store.dispatch({
      type: "CHECKED",
      payload: key
    });
  };

  handleRemove = key => {
    store.dispatch({
      type: "DE_TODO",
      payload: key
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Div>
        <Input
          value={inputValue}
          onChange={this.handleInput}
          onPressEnter={this.handlePress}
        />
        <TodoList
          todos={store.getState().todos}
          onChecked={key => this.handleChecked(key)}
          onRemove={key => this.handleRemove(key)}
        />
      </Div>
    );
  }
}

const Counter = ({ value, onAdd, onDe }) => {
  return (
    <Div>
      <h1>{value}</h1>
      <button onClick={onAdd}>+</button>
      <button onClick={onDe}>-</button>
    </Div>
  );
};

const r = () => {
  ReactDOM.render(
    <Fragment>
      <App />
      <Counter
        value={store.getState().counter}
        onAdd={() => store.dispatch({ type: "ADD" })}
        onDe={() => store.dispatch({ type: "DE" })}
      />
      <Demo
        value={store.getState().counter}
        onAdd={() => store.dispatch({ type: "ADD" })}
        onDe={() => store.dispatch({ type: "DE" })}
      />
    </Fragment>,
    document.getElementById("app")
  );
};

store.subscribe(r);
r();
