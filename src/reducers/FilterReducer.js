import { combineReducers } from 'redux';
import { getSomeDayAgo } from '../utils';

const dateReducer = (state = getSomeDayAgo(1, 181), action) => {
  switch (action.type) {
    case 'CHANGE_DATE':
      return action.payload;
    default:
      return state;
  }
};

const dateRangeReducer = (state = getSomeDayAgo(1, 181), action) => {
  switch (action.type) {
    case 'CHANGE_DATE_RANGE':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  date: dateReducer,
  dateRange: dateRangeReducer
});
