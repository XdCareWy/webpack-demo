import React, { Component } from 'react';
import './time.less';
export default class Time extends Component {
  render() {
    return (
      <div style={{ width: '80%', margin: '20px auto' }}>
        <div className="flip down go">
          <div className="digital front number0" />
          <div className="digital back number1" />
        </div>
      </div>
    );
  }
}
