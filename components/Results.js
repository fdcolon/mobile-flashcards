import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { connect } from 'react-redux'

import { handleResetQuiz } from '../redux/actions'

import { formatQuizResults } from '../utils/helpers'
import { common, buttons } from '../styles'
import { green, lightGreen, blue, lightBlue, bronze, lightBronze, red, lightRed } from '../utils/colors'

class Results extends Component {
  componentDidMount () {
    this.props.navigation.setOptions({
      headerTitle: 'Quiz Results',
      headerTitleAlign: 'center',
      headerLeft: null,
    })
  }

  setBigResultClass (value) {
    switch (true) {
      case (value === 100):
        return styles.excellent
      case (value >= 80):
        return styles.awesome
      case (value > 50):
        return styles.wellDone
      default:
        return styles.tooBad
    }
  }

  getResultMessage (value) {
    switch (true) {
      case (value === 100):
        return `Excellent Job!`
      case (value >= 80):
        return `Awesome!`
      case (value > 50):
        return `Well Done!`
      default:
        return `Don't give up!`
    }
  }

  goToRestartQuiz () {
    const { id, title, totalQuizes, navigation, handleResetQuiz } = this.props

    handleResetQuiz(id)

    navigation.dispatch(StackActions.pop(1))
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
    const { totalQuizes, results } = this.props

    return (
      <View style={ styles.container }>
        <View style={ common.center }>
          <View style={ styles.scoreSmall }>
            <Text style={ styles.text }>
              Your Score!
            </Text>
            <Text style={ [styles.text, buttons.labelDark] }>
              { `${results.totalScore} / ${totalQuizes}` }
            </Text>
          </View>
          <View style={ styles.resultsBlock }>
            <View style={ [styles.scoreBig, this.setBigResultClass(results.percentage)] }>
              <Text style={ [styles.percentage, buttons.labelLight] }>
                { results.percentage }%
              </Text>
            </View>
            <Text style={ [styles.text, buttons.labelDark] }>
              { this.getResultMessage(results.percentage) }
            </Text>
          </View>
        </View>
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
  },
  scoreSmall: {
    marginBottom: 42,
    justifyContent: 'flex-end'
  },
  resultsBlock: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scoreBig: {
    marginBottom: 16,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  excellent: {
    backgroundColor: green,
    borderColor: lightGreen
  },
  awesome: {
    backgroundColor: blue,
    borderColor: lightBlue
  },
  wellDone: {
    backgroundColor: bronze,
    borderColor: lightBronze
  },
  tooBad: {
    backgroundColor: red,
    borderColor: lightRed
  },
  percentage: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

const mapStateToProps = ({ loading, decks }, { route }) => {
  const { id, title } = route?.params || {}
  const deck = decks[id]
  const totalQuizes = deck.questions.length

  return {
    id,
    title,
    totalQuizes,
    results: formatQuizResults(deck),
    loading
  }
}

const mapDispatchToProps = {
  handleResetQuiz
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)