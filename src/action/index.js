import { getListInterface } from '../api/index';
import { startApi, successApi } from './ListData';

export function getListAction(pageNum) {
  return (dispatch, getState) => {
    dispatch(startApi(true));
    getListInterface(pageNum).then(response => {
      const { status, data: { code, result } = {} } = response;
      if (status === 200 && code === 0) {
        dispatch(successApi(result));
      }
    });
  };
}
