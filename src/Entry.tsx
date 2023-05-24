import React from 'react'
import { Text, View } from 'react-native'
import { log } from './shared/utils/LoggerUtil'
import BreweryListScreen from '@screens/Home/BreweryListScreen'
import AppNavigator from '@screens/Navigation/AppNavigator'

const Entry = () => {
  log('Entry')
  return <AppNavigator/>
}

export default Entry