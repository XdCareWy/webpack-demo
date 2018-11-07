import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Styled from "styled-components";
import "./demo.less";

const App = () => {
  return (
    <div>
      <Div />
      <div className="item">
        asdsd
      </div>
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
