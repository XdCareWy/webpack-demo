import React from "react";
import ReactDOM from "react-dom";
import img from "./7.jpg";
import { Button } from 'antd';
import "./demo.less";
import "./style.css";
import Styled from "styled-components";

const App = () => {
  return (
    <div>
      <div className="box" />
      <div className="img" />
      <div>
        <img width={100} src={img} alt="aaaaaaaaaaaaaaaaa" />
      </div>
      <Button type="primary">确认</Button>
      <div className="a">
        mmmmm
      </div>
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

