import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Counter from "./containers/Counter";
import reducer from "./reducers/index";
import { Todos } from "./containers/index";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
  ReactDOM.render(
    <Fragment>
      <Todos store={store} />
      <Counter store={store} />
    </Fragment>,
    document.getElementById("app")
  );
};

store.subscribe(render);
render();
