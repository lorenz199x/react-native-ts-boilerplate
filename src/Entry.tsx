import React from 'react'
import { Text, View } from 'react-native'
import { log } from './shared/utils/LoggerUtil'

const Entry = () => {
  log('Entry')
  return (
    <View>
      <Text>Entry</Text>
    </View>
  )
}

export default Entry