import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Entry from './src/Entry';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './src/redux';
const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Entry />
      </PersistGate>
    </Provider>
  )
//   return (
//     <Provider store={store}>
//       <Entry />
//     </Provider>
//   );
}

export default App