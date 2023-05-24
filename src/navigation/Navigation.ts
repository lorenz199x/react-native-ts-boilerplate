import { CommonActions, StackActions } from '@react-navigation/native';


export let navigationRef: any;

function setTopLevelNavigator(navigatorRef: any) {
  navigationRef = navigatorRef;
}

function navigate(name: string, params?: any) {
  if (!navigationRef || (navigationRef && !navigationRef.dispatch)) {
    return;
  }
  navigationRef.dispatch(
    CommonActions.navigate({ name, params })
  );
}

function goBack() {
  if (!navigationRef || (navigationRef && !navigationRef.dispatch)) {
    return;
  }
  navigationRef.dispatch(
    CommonActions.goBack()
  );
}

function pop(count: number) {
  if (!navigationRef || (navigationRef && !navigationRef.dispatch)) {
    return;
  }
  navigationRef.dispatch(
    StackActions.pop(count)
  );
}


function push(routeName: string, params?: any) {
  if (!navigationRef || (navigationRef && !navigationRef.dispatch)) {
    return;
  }
  navigationRef.dispatch(
    StackActions.push(routeName, params)
  );
}

function reset(name: any, params?: any) {
  if (!navigationRef || (navigationRef && !navigationRef.dispatch)) {
    return;
  }
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params
        }
      ]
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  push,
  reset
};
