import React, { Component } from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class LoadablePage extends Component {
  constructor(props) {
    super(props);
    NProgress.start();
  }
  componentWillUnmount() {
    NProgress.done();
  }
  render() {
    return <div />;
  }
}

const LoadableComponent = component => {
  return Loadable({
    loader: component,
    loading: () => <LoadablePage />
  });
};

export default LoadableComponent;
