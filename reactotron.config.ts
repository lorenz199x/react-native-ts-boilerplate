import { NativeModules } from 'react-native';
import apisaucePlugin from 'reactotron-apisauce';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appName = require('./app.json').name;

let scriptHostname = 'localhost';
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotron = Reactotron.configure({
  host: scriptHostname,
  name: appName
})
  .useReactNative({
    asyncStorage: false
  })
  .setAsyncStorageHandler(AsyncStorage)
  .use(apisaucePlugin())
  .use(reactotronRedux());

if (__DEV__) {
  reactotron.connect();
}

export default reactotron;
