// Redux Saga - Effects
import { all, takeLatest } from 'redux-saga/effects';

// Sagas
import { login } from './auth';
import { refreshFunc } from './data';

export default function* rootSaga() {
  yield all([yield takeLatest('LOGIN', login)]);
}
