import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { handleSetInitialData } from '../redux/actions'
import { buttons } from '../styles'

class Welcome extends Component {
  initializeData (startEmpty = false) {
    const { handleSetInitialData } = this.props
    handleSetInitialData(startEmpty)
  }

  render() {
    return (
      <View style={ welcomeStyles.container }>
        <Text style={ welcomeStyles.title }>
          Welcome! We noticed this is the first time you use this app. Please, select one option to continue.
        </Text>
        <View style={ buttons.buttonBlockAtBottom }>
          <TouchableOpacity
            style={ [buttons.base, buttons.secondary, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.initializeData(true) }
          >
            <Text style={ [buttons.label, buttons.labelDark] }>
              Start with empty data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [buttons.base, buttons.primary, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.initializeData() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Start with preset data
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontSize: 18
  },
  row: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

const mapDispatchToProps = {
  handleSetInitialData
}

export default connect(
  null,
  mapDispatchToProps
)(Welcome)