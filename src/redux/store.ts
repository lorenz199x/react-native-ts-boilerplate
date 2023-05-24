import { applyMiddleware, compose, legacy_createStore as createStore, StoreEnhancer } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../reactotron.config';
import { rootReducer } from './reducers';
import { rootSaga } from './sagas';
import ReduxThunk from 'redux-thunk';

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  let storeEnhancer: StoreEnhancer[] = [applyMiddleware(...middleware)];
  if (Reactotron.createEnhancer) {
    storeEnhancer = storeEnhancer.concat(Reactotron.createEnhancer());
  }
  // const store = createStore(rootReducer, compose(...storeEnhancer));
  // const persistor = persistStore(store);
  // sagaMiddleware.run(rootSaga);

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return {
    store,
    persistor,
  };
}
