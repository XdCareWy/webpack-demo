import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Styled from "styled-components";

const App = () => {
  return (
    <div>
      <Button type="primary">确认</Button>
      <Div />
    </div>
  );
};

const Div = Styled.div`
  margin: 10px;
  background-color: red;
  width: 100px;
  height: 100px;
`;

ReactDOM.render(<App />, document.getElementById("app"));
