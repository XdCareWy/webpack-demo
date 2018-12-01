import React, { Fragment } from 'react';
import { Button } from 'antd/lib/index';
import Styled from 'styled-components';

export const Counter = ({ value, increase, decrease, increaseAsync }) => (
  <Fragment>
    <h1>{value}</h1>
    <ButtonCSS onClick={increase}>+</ButtonCSS>
    <ButtonCSS onClick={decrease}>-</ButtonCSS>
    <ButtonCSS onClick={increaseAsync}>延迟1s +</ButtonCSS>
  </Fragment>
);

const ButtonCSS = Styled(Button)`
  width: 50px;
  margin: 10px;
`;
