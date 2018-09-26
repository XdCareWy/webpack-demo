import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Styled from 'styled-components';
import Counter from './containers/Counter';
import reducer from './reducers/index';
import { AddTodos, TodoList } from './containers/index';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
