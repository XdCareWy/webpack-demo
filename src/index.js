import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
import Styled from 'styled-components';
import Counter from './containers/Counter';
import reducer from './reducers/index';
import { AddTodos, TodoList, DataList } from './containers/index';
import rootSaga from './sagas/CounterSaga';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
const logger = createLogger({
  duration: true,
});
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

const App = () => (
  <Div>
    <AddTodos />
    <TodoList />
    <Counter />
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
