import axios from 'axios';

const BASE_URL = 'https://easy-mock.com/mock/5b02673795118136368f1a84/myApp';

const DATA_URL = `${BASE_URL}/getList`;

export const getListInterface = (pageNum = 1) => {
  return axios.get(DATA_URL, { params: { pageNum: pageNum } });
};
