// import { put, takeEvery } from 'redux-saga';
// import { getListInterface } from '../api/index';
// import { successApi } from '../action/ListData';
//
// function* fetchData(pageNum) {
//   const response = yield getListInterface(pageNum);
//   if (response.status === 200) {
//     const { code, result } = response.data;
//     if (code === 0) {
//       yield put(successApi(result));
//     }
//   }
// }
//
// export default function* fetchDataList() {
//   yield takeEvery('LIST', fetchData);
// }

export function* helloSaga() {
  console.log('Hello Sagas!');
}
