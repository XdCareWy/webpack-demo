import TodoReducer from "./TodoReducer";
import CounterReducer from "./CounterReducer";
import { combineReducers } from "redux";

export default combineReducers({
  todos: TodoReducer,
  counter: CounterReducer
});
