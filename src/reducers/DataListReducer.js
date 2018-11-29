const DataListReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOADING':
      return action.payload;
    case 'LIST':
      return action.payload;
    default:
      return state;
  }
};

export default DataListReducer;
