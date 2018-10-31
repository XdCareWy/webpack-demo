import React from 'react';
import ReactDOM from 'react-dom';
import InputTag from './InputTag';

const App = () => {
  return <InputTag style={{ width: '400px' }} onChange={val => console.log(val)} />;
};

ReactDOM.render(<App />, document.getElementById('app'));
