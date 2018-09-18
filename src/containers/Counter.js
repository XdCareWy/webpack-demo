import React, { Component } from "react";
import { CounterTitle } from "../components/CounterTitle";
import { Button } from "antd";
import Styled from "styled-components";

class Counter extends Component {
  render() {
    const { store } = this.props;
    return (
      <Div>
        <CounterTitle value={store.getState().counter} />
        <ButtonCSS onClick={() => store.dispatch({ type: "INCREASE" })}>+</ButtonCSS>
        <ButtonCSS onClick={() => store.dispatch({ type: "DECREASE" })}>-</ButtonCSS>
      </Div>
    );
  }
}

export default Counter;

const ButtonCSS = Styled(Button)`
  width: 50px;
  margin: 10px;
`;

const Div = Styled.div`
  width: 800px;
  margin: 20px auto;
`;
