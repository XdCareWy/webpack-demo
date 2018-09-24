import _ from 'lodash';

const TodoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE': {
      const newState = _.cloneDeep(state);
      const index = newState.findIndex(item => item.id === action.payload);
      newState.splice(index, 1);
      return newState;
    }
    case 'CHECKED': {
      const newState = _.cloneDeep(state);
      newState.forEach(item => {
        if (item.id === action.payload) {
          item.finished = !item.finished;
        }
      });
      return newState;
    }
    default:
      return state;
  }
};

export default TodoReducer;
