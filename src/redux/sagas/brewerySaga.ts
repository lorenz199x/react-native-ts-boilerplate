import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType, fetchBreweries, fetchBreweriesSuccess, fetchBreweriesError, loadMoreBreweries, searchBreweriesSuccess, searchBreweriesError } from '../actions/breweryAction'
import { Action } from 'reactnativets';
import { App } from '@services/';

export function* fetchBreweriesSaga(action: Action) {
  try {
    const response = yield call(App.getBreweryApi, action.payload)
    yield put(fetchBreweriesSuccess(response.data));
  } catch (error) {
    yield put(fetchBreweriesError(error));
  }
}

export function* loadMoreBreweriesSaga(action: Action) {
  try {
    const response = yield call(App.getMoreBrewery, action.payload)
    yield put(fetchBreweriesSuccess(response.data));
  } catch (error) {
    log('ERROR', error)
    yield put(fetchBreweriesError(error));
  }
}

export function* searchBreweriesSaga(action: any) {
  try {
    const response = yield call(App.searchBreweries, action.payload);
    yield put(searchBreweriesSuccess(response.data));
  } catch (error) {
    yield put(searchBreweriesError(error));
  }
}

export function* watchBrewerySaga() {
  yield takeLatest(ActionType.FETCH_BREWERIES_REQUEST, fetchBreweriesSaga);
  yield takeLatest(ActionType.LOAD_MORE_BREWERIES, loadMoreBreweriesSaga);
  yield takeLatest(ActionType.SEARCH_BREWERIES_REQUEST, searchBreweriesSaga);
}