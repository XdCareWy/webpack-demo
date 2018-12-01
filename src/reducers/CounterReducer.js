const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    case 'INCREASE_ASYNC':
      return state;
    default:
      return state;
  }
};

export default counterReducer;
