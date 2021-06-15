// Redux Saga - Effects
import { put } from 'redux-saga/effects';

// Redux - Actions
import { refreshAction } from '../actions/data';

export function* refreshFunc(action) {
  try {
    const refresh = action.refresh;

    yield put(refreshAction(refresh));
  } catch (err) {
    console.log(err);
  }
}
