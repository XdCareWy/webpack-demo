import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { addTodo } from '../action/Todos';

class AddTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInput = e => {
    const val = e.target.value;
    this.setState({ inputValue: val });
  };
  handlePress = e => {
    const val = e.target.value;
    const { dispatch } = this.props;
    const newTodo = {
      id: Math.random(),
      value: val,
      finished: false,
    };
    dispatch(addTodo(newTodo));
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    return <Input value={inputValue} onChange={this.handleInput} onPressEnter={this.handlePress} />;
  }
}

export default connect()(AddTodos);
