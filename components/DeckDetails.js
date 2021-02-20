import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import Loading from './helpers/Loading'
import HeaderRightButton from './helpers/HeaderRightButton'
import WaitingModal from './helpers/WaitingModal'

import { handleGetDeck, handleDeleteDeck, handleResetQuiz } from '../redux/actions'

import { cardsLabel } from '../utils/helpers'
import { white, lightRed } from '../utils/colors'
import { buttons } from '../styles'
import { deckStyles } from './Decks'

class DeckDetails extends Component {
  state = {
    showModal: false,
    resetQuizData: false,
    iconConfig: {
      size: 22,
      color: white,
      style: {
        paddingLeft: 8
      }
    }
  }

  componentDidMount () {
    const { id, title, handleGetDeck } = this.props

    this.props.navigation.setOptions({
      title,
      headerTitleAlign: 'center',
      headerRight: () => (
        <HeaderRightButton
          type="delete"
          label="Delete"
          color={ lightRed }
          onPress={ () => this.showDeleteConfirmation(id, title) }
        />
      )
    })

    handleGetDeck(id)
  }

  componentDidUpdate () {
    const { loading } = this.props
    const { showModal, resetQuizData } = this.state

    if (!loading && showModal) {
      this.setState({
        showModal: false,
        resetQuizData: false
      })

      if (resetQuizData) {
        this.onAddCard()
      } else {
        this.goBack()
      }
    }

  }

  goBack () {
    const { navigation } = this.props
    navigation.goBack()
  }

  checkQuizStatus () {
    const { id, quizStatus, handleResetQuiz } = this.props

    if (quizStatus === 'incomplete') {
      handleResetQuiz(id)
    }
  }

  showDeleteConfirmation (id, title) {
    const { handleDeleteDeck } = this.props

    Alert.alert(  
      'Delete Deck',
      `You are trying to delete "${title}" deck. Do you confirm this action?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            handleDeleteDeck(id)
            this.setState({
              showModal: true
            })
          }
        }
      ]
    )
  }

  showResetConfirmation (id, title) {
    const { handleResetQuiz } = this.props

    Alert.alert(  
      'Reset Quiz',
      `Adding a new card to "${title}" deck will reset your previous result. Do you want to reset the quiz and add a new card?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            handleResetQuiz(id)
            this.setState({
              showModal: true,
              resetQuizData: true
            })
          }
        }
      ]
    )
  }

  renderStartIcon (platform, { size, color, style }) {
    return platform === 'ios'
      ? <Ionicons name="chevron-forward" size={ size } color={ color } style={ style } />
      : <MaterialCommunityIcons name="chevron-right" size={ size } color={ color } style={ style } />
  }

  onRequestAddCard () {
    const { deck, id, title } = this.props

    if (deck.answeredOn) {
      this.showResetConfirmation(id, title)
    } else {
      this.onAddCard()
    }
  }

  onAddCard () {
    const { id, deck, navigation } = this.props

    navigation.navigate(
      'Add Card',
      { id, title: deck.title }
    )
  }

  onStartQuiz (isComplete) {
    const { id, deck, navigation } = this.props

    if (!isComplete)  {
      navigation.navigate(
        'Quiz',
        { id, title: deck.title, quizIndex: 0, totalQuizes: deck.questions.length }
      )
    } else {
      navigation.navigate(
        'Results',
        { id, title: deck.title }
      )
    }
  }

  render() {
    const { loading, deck, totalQuestions, quizStatus } = this.props
    const { showModal, resetQuizData, iconConfig } = this.state

    if (!showModal && (loading || !deck)) {
      return (
        <Loading />
      )
    }

    return (
      <View style={ styles.container}>
        <WaitingModal
          visible={ showModal }
          message={ resetQuizData
            ? `Reseting quiz for "${deck.title}" deck. Please wait...`
            : `Deleting "${deck.title}" deck. Please wait...`
          }
          onRequestClose={ () => {
            this.setState({
              showModal: false
            })
          } }
        />
        <View style={ styles.detiailsBlock }>
          <Text style={ deckStyles.title }>{ deck.title }</Text>
          <Text style={ deckStyles.details }>{ cardsLabel(totalQuestions) }</Text>
        </View>
        <View style={ buttons.buttonBlockAtBottom }>
          <TouchableOpacity
            style={ [buttons.base, buttons.primary, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.onRequestAddCard() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [buttons.base, buttons.correct, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.onStartQuiz(quizStatus === 'complete') }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              { quizStatus === 'complete' ? 'View Results' : 'Start Quiz' }
            </Text>
            { this.renderStartIcon(Platform.OS, iconConfig) }
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  detiailsBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionsBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ deck, loading }, { route }) => {
  const { id, title } = route?.params || {}
  const totalQuestions = deck?.questions?.length || 0
  const quizStatus = (!!deck?.answeredOn) ? 'complete' : 'not solved'

  return {
    id,
    title,
    deck,
    totalQuestions,
    quizStatus,
    loading
  }
}

const mapDispatchToProps = {
  handleGetDeck,
  handleDeleteDeck,
  handleResetQuiz
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails)