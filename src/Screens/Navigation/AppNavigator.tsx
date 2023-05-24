import React, { useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navigation, { navigationRef } from '@navigation/Navigation';
import { Screen } from "@navigation/Screen";
import BreweryListScreen from '@screens/Home/BreweryListScreen';
import BreweryDetailsScreen from '@screens/Home/BreweryDetailsScreen';
import BookmarkItemScreen from '@screens/Home/BookmarkItemScreen';

const RootStack = createStackNavigator();
export default function RootNavigator() {
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={(navigatorRef: any) => Navigation.setTopLevelNavigator(navigatorRef)}
      onReady={() => { routeNameRef.current = navigationRef.getCurrentRoute().name }}
      onStateChange={() => {
        const currentRouteName = navigationRef.getCurrentRoute().name;
        routeNameRef.current = currentRouteName;
      }}
    >
      <RootStack.Navigator
        initialRouteName={Screen.BREWERY_LIST_SCREEN}
        screenOptions={{
          // gestureEnabled: true,
          animationEnabled: true,
          headerShown: false
        }}
      >
        <RootStack.Screen name={Screen.BREWERY_LIST_SCREEN} component={BreweryListScreen} />
        <RootStack.Screen name={Screen.BREWERY_DETAILS_SCREEN} component={BreweryDetailsScreen} />
        <RootStack.Screen name={Screen.BOOKMARKED_ITEMS_SCREEN} component={BookmarkItemScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
