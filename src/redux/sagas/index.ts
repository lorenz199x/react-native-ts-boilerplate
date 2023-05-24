import { all } from 'redux-saga/effects';
import { watchBrewerySaga } from './brewerySaga';

export function* rootSaga(): Generator {
  yield all([
    watchBrewerySaga()
  ]);
}
