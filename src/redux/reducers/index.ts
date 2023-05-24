import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action } from 'reactnativets';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { breweryReducer } from './breweryReducers'

const appConfig = {
  key: 'app',
  storage: AsyncStorage,
  timeout: 0,
  whitelist: [
    'breweries',
    'bookmarkedItems'
  ]
};

const Reducers = combineReducers({
  // Breweries: breweryReducer,
  Breweries: persistReducer(appConfig, breweryReducer),

});

export type RootState = ReturnType<typeof Reducers>;

export const rootReducer = (state: any, action: Action) => {
  return Reducers(state, action);
};
