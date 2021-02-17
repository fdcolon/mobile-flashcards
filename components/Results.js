import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { buttons } from '../styles'

class Results extends Component {
  componentDidMount () {
    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: null,
    })
  }

  goToRestartQuiz () {
    const { id, title, totalQuizes, navigation } = this.props

    navigation.navigate(
      'Quiz',
      { id, title, quizIndex: 0, totalQuizes }
    )
  }

  goToDeckDetails () {
    const { id, title, navigation } = this.props

    navigation.navigate(
      'Deck Details',
      { id, title }
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Results</Text>
        <View style={ buttons.buttonBlockAtBottom }>
          <TouchableOpacity
            style={ [buttons.base, buttons.secondary, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.goToRestartQuiz() }
          >
            <Text style={ [buttons.label, buttons.labelDark] }>
              Restart Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [buttons.base, buttons.primary, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.goToDeckDetails() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Back to Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
})

const mapStateToProps = ({ loading, decks }, { route }) => {
  const { id, title } = route?.params || {}
  const totalQuizes = decks[id].questions.length

  return {
    id,
    title,
    totalQuizes,
    loading
  }
}

export default connect(
  mapStateToProps
)(Results)