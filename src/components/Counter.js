import React, { Fragment } from 'react';
import { Button } from 'antd/lib/index';
import Styled from 'styled-components';

export const Counter = ({ value, increase, decrease }) => (
  <Fragment>
    <h1>{value}</h1>
    <ButtonCSS onClick={increase}>+</ButtonCSS>
    <ButtonCSS onClick={decrease}>-</ButtonCSS>
  </Fragment>
);

const ButtonCSS = Styled(Button)`
  width: 50px;
  margin: 10px;
`;
