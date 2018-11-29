import TodoReducer from './TodoReducer';
import CounterReducer from './CounterReducer';
import FilterReducer from './FilterReducer';
import DataListReducer from './DataListReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  todos: TodoReducer,
  counter: CounterReducer,
  filter: FilterReducer,
  data: DataListReducer,
});
