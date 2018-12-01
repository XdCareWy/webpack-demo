import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';
import { helloSaga } from './helloSaga';

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREASE' });
}

function* watchIncreaseAsync() {
  yield takeEvery('INCREASE_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncreaseAsync()]);
}
