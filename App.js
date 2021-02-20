import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux/reducers'
import middleware from './redux/middleware'

import CustomStatusBar from './components/helpers/CustomStatusBar'
import Main from './components/Main'

import { setDailyNotification } from './utils/helpers'
import { blue } from './utils/colors'
import { common } from './styles'

const store = createStore(reducers, middleware)

export default class App extends Component {
  componentDidMount () {
    setDailyNotification()
  }

  render() {
    return (
      <Provider store={ store }>
        <View style={ common.container }>
          <CustomStatusBar backgroundColor={ blue } barStyle='light-content' />
          <Main />
        </View>
      </Provider>
    )
  }
}
