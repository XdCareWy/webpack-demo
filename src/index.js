import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Counter from './containers/Counter';
import reducer from './reducers/index';
import { Todos } from './containers/index';
import DateRanges from './common/DateRanges';
import DateRange from './common/DateRange';
import Styled from 'styled-components';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
  ReactDOM.render(
    <LocaleProvider locale={zhCN}>
      <Fragment>
        <Todos store={store} />
        <Counter store={store} />
        <Div>
          <DateRanges
            value={store.getState().filter.date}
            onChange={val => store.dispatch({ type: 'CHANGE_DATE', payload: val })}
          />
          <p>{`${store.getState().filter.date[0]} - ${store.getState().filter.date[1]}`}</p>
        </Div>
        <Div>
          <DateRange
            value={store.getState().filter.dateRange}
            onChange={val => store.dispatch({ type: 'CHANGE_DATE_RANGE', payload: val })}
          />
          <p>{`${store.getState().filter.dateRange[0]} - ${
            store.getState().filter.dateRange[1]
          }`}</p>
        </Div>
      </Fragment>
    </LocaleProvider>,
    document.getElementById('app')
  );
};

const Div = Styled.div`
  width: 800px;
  margin: 20px auto;
`;

store.subscribe(render);
render();
