import React, { Fragment } from 'react';
import { Button } from 'antd/lib/index';
import Styled from 'styled-components';

export const Counter = ({ value, increase, decrease }) => (
  <Fragment>
    <h1>{value}</h1>
    <ButtonCSS onClick={increase}>+</ButtonCSS>
    <ButtonCSS onClick={decrease}>-</ButtonCSS>
    <div>
      <img src={require('../img/e1a0ea6189e5c339.png')} alt="" />
      <img src={require('../img/2.jpg')} alt="" />
      <img src={require('../img/3.jpg')} alt="" />
    </div>
  </Fragment>
);

const ButtonCSS = Styled(Button)`
  width: 50px;
  margin: 10px;
`;
