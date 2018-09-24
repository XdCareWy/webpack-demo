import React, { Component } from 'react';
import { Input } from 'antd';
import { TodoList } from '../components/TodoList';
import Styled from 'styled-components';

class Todos extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
  }

  handleInput = e => {
    const val = e.target.value;
    this.setState({ inputValue: val });
  };
  handlePress = e => {
    const val = e.target.value;
    const { store } = this.props;
    store.dispatch({
      type: 'ADD',
      payload: {
        id: Math.random(),
        value: val,
        finished: false
      }
    });
    this.setState({ inputValue: '' });
  };

  render() {
    const { store } = this.props;
    const { inputValue } = this.state;
    return (
      <Div>
        <Input value={inputValue} onChange={this.handleInput} onPressEnter={this.handlePress} />
        <TodoList
          list={store.getState().todos}
          onChecked={key =>
            store.dispatch({
              type: 'CHECKED',
              payload: key
            })
          }
          onRemove={key =>
            store.dispatch({
              type: 'REMOVE',
              payload: key
            })
          }
        />
      </Div>
    );
  }
}

export default Todos;

const Div = Styled.div`
  width: 800px;
  margin: 20px auto;
`;
