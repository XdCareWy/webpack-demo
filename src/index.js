import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import Styled from 'styled-components';
// import Counter from './containers/Counter';
import reducer from './reducers/index';
// import { AddTodos, TodoList } from './containers/index';
import Loadable from './common/LoadableComponent';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const middleware = [];
const logger = createLogger({
  duration: true
});
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

const A = Loadable(() => import('./containers/Counter'));
const B = Loadable(() => import('./containers/DataList'));
const C = Loadable(() => import('./containers/AddTodos'));
const D = Loadable(() => import('./containers/TodoList'));

const App = () => (
  <Div>
    {/*<Counter />*/}
    {/*<DataList />*/}
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/A">A</Link>
          </li>
          <li>
            <Link to="/about">B</Link>
          </li>
          <li>
            <Link to="/topics">C</Link>
          </li>
          <li>
            <Link to="/D">D</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/A" component={A} />
        <Route path="/about" component={B} />
        <Route path="/topics" component={C} />
        <Route path="/D" component={D} />
      </div>
    </Router>
  </Div>
);

const Div = Styled.div`
  width: 800px;
  margin: 20px auto;
`;

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('app')
);
