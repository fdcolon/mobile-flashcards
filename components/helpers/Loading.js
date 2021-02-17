import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'

import { common } from '../../styles'
import { blue } from '../../utils/colors'

const Loading = () => {
  return (
    <View style={ common.center }>
      <ActivityIndicator size="large" color={ blue } />
      <Text>Loading...</Text>
    </View>
  )
}

export default Loading