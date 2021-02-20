import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import WaitingModal from './helpers/WaitingModal'

import { handlePostAnswer } from '../redux/actions'

import { buttons, common } from '../styles'
import { black, red, white } from '../utils/colors'

class Quiz extends Component {
  state = {
    showModal: false,
    showQuestion: true
  }

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
      headerBackTitle: title.length > 12 ? `${title.slice(0, 12)}...` : title,
      headerBackTitleVisible: true
    })
  }

  componentDidUpdate () {
    const { loading } = this.props
    const { showModal } = this.state

    if (!loading && showModal) {
      this.setState({
        showModal: false,
        showQuestion: true
      })
      this.goToNextQuiz()
    }
  }

  flipCard () {
    const { showQuestion } = this.state

    if (showQuestion) {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    }

    this.setState({
      showQuestion: !showQuestion
    })
  }

  onSetAnswer (answer) {
    const { id, quizNumber, handlePostAnswer } = this.props

    handlePostAnswer(id, quizNumber, answer)

    this.setState({
      showModal: true
    })
  }

  goToNextQuiz () {
    const { id, title, nextQuizIndex, totalQuizes, navigation } = this.props

    if (nextQuizIndex) {      
      Animated.spring(this.animatedValue, {
        toValue: 0,
        useNativeDriver: true
      }).start()

      navigation.navigate(
        'Quiz',
        { id, title, quizIndex: nextQuizIndex, totalQuizes }
      )
    } else {
      navigation.navigate(
        'Results',
        { id, title }
      )
    }
  }

  render() {
    const { item, quizNumber, totalQuizes } = this.props
    const { showQuestion, showModal } = this.state
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    }
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    }
  
    if (!totalQuizes) {
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
        <WaitingModal
          visible={ showModal }
          message="Saving answer. Please wait..."
          onRequestClose={ () => {
            this.setState({
              showModal: false
            })
          } }
        />
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
            style={ [
              buttons.base,
              buttons.correct,
              styles.actionButton
            ] }
            onPress={ () => this.onSetAnswer(true) }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [
              buttons.base,
              buttons.incorrect,
              styles.actionButton
            ] }
            onPress={ () => this.onSetAnswer(false) }
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
    width: '100%',
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
    width: '70%',
    alignItems: 'center'
  }
})

const mapStateToProps = ({ loading, decks }, { route }) => {
  const { id, title, quizIndex, totalQuizes } = route?.params || {}
  const quizNumber = quizIndex + 1

  return {
    id,
    title,
    quizNumber,
    totalQuizes,
    item: decks[id].questions[quizIndex] || null,
    nextQuizIndex: quizNumber < totalQuizes
      ? quizIndex + 1
      : null,
    loading
  }
}

const mapDispatchToProps = {
  handlePostAnswer
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)