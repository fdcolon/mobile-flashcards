import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { buttons, common } from '../styles'
import { black, red, white } from '../utils/colors'

class Quiz extends Component {
  state = {
    showQuestion: true
  }

  componentDidMount () {
    const { title } = this.props

    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerBackTitle: title,
      headerBackTitleVisible: true
    })
  }

  toggleCard () {
    const { showQuestion } = this.state

    this.setState({
      showQuestion: !showQuestion
    })
  }

  goToNextQuiz () {
    const { id, title, nextQuizIndex, totalQuizes, navigation } = this.props

    if (nextQuizIndex) {
      navigation.navigate(
        'Quiz',
        { id, title, quizIndex: nextQuizIndex, totalQuizes }
      )
    } else {
      navigation.navigate(
        'Results',
        { id, title, totalQuizes }
      )
    }
  }

  render() {
    const { item, quizNumber, totalQuizes } = this.props
    const { showQuestion } = this.state
  
    if (!item) {
      return (
        <View style={ [styles.container, common.center] }>
          <Text style={ [common.label, { textAlign: 'center' }] }>
            Sorry, you cannot take a quiz because there are no cards in the deck.
          </Text>
        </View>
      )
    }
  
    return (
      <View style={ styles.container }>
        <Text style={ styles.counter }>Quiz { quizNumber } / { totalQuizes }</Text>
        <View style={ styles.questionBlock }>
          <View style={ styles.card }>
            <Text style={ styles.text }>
              { showQuestion ? item.question : item.answer }
            </Text>
          </View>
          <TouchableOpacity
            style={ styles.textButton }
            onPress={ () => this.toggleCard() }
          >
            <Text style={ styles.toggleButton }>
              { showQuestion ? 'View Answer' : 'View Question' }
            </Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.actionsBlock }>
          <TouchableOpacity
            style={ [buttons.base, buttons.correct, styles.actionButton] }
            onPress={ () => this.goToNextQuiz() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [buttons.base, buttons.incorrect, styles.actionButton] }
            onPress={ () => this.goToNextQuiz() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start'
  },
  counter: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  questionBlock: {
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    padding: 16,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: black,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200
  },
  textButton: {
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    textAlign: 'center'
  },
  toggleButton: {
    paddingTop: 16,
    color: red,
    fontSize: 16,
    fontWeight: 'bold'
  },
  actionsBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButton: {
    marginBottom: 16,
    padding: 24,
    width: 300,
    alignItems: 'center'
  }
})

const mapStateToProps = ({ loading, decks }, { route }) => {
  const { id, title, quizIndex, totalQuizes } = route?.params || {}
  const quizNumber = quizIndex + 1
  const item = totalQuizes > 0
    ? decks[id].questions[quizIndex]
    : null

  return {
    id,
    title,
    quizNumber,
    totalQuizes,
    item,
    nextQuizIndex: quizNumber < totalQuizes
      ? quizIndex + 1
      : null,
    loading
  }
}

export default connect(
  mapStateToProps
)(Quiz)