import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { buttons, common } from '../styles'
import { black, red, white } from '../utils/colors'

class Quiz extends Component {
  state = {
    showQuestion: true
  }

  value = 0
  animatedValue = new Animated.Value(0)
  frontInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  })
  backInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  componentDidMount () {
    const { title } = this.props

    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerBackTitle: title,
      headerBackTitleVisible: true
    })

    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
  }

  flipCard () {
    const { showQuestion } = this.state

    this.setState({
      showQuestion: !showQuestion
    })

    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    }
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
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    }
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    }
  
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
          <Animated.View style={ [styles.flipCard, frontAnimatedStyle] }>
            <Text style={ styles.text }>
              { item.question }
            </Text>
          </Animated.View>
          <Animated.View style={ [styles.flipCard, styles.flipCardBack, backAnimatedStyle] }>
            <Text style={ styles.text }>
              { item.answer }
            </Text>
          </Animated.View>
        </View>
        <TouchableOpacity
          style={ styles.textButton }
          onPress={ () => this.flipCard() }
        >
          <Text style={ styles.toggleButton }>
            { showQuestion ? 'View Answer' : 'View Question' }
          </Text>
        </TouchableOpacity>
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
  flipCard: {
    padding: 16,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: black,
    backgroundColor: white,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute'
  },
  textButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
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