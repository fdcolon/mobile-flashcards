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

import { handleGetDeck, handleDeleteDeck } from '../redux/actions'

import { cardsLabel } from '../utils/helpers'
import { white, lightRed } from '../utils/colors'
import { buttons } from '../styles'
import { deckStyles } from './Decks'

class DeckDetails extends Component {
  state = {
    showModal: false,
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
    const { showModal } = this.state

    if (!loading && showModal) {
      this.setState({
        showModal: false
      })
      this.goBack ()
    }
  }

  goBack () {
    const { navigation } = this.props
    navigation.goBack()
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

  renderStartIcon (platform, { size, color, style }) {
    return platform === 'ios'
      ? <Ionicons name="chevron-forward" size={ size } color={ color } style={ style } />
      : <MaterialCommunityIcons name="chevron-right" size={ size } color={ color } style={ style } />
  }

  onAddCard () {
    const { id, deck, navigation } = this.props

    navigation.navigate(
      'Add Card',
      { id, title: deck.title }
    )
  }

  onStartQuiz () {
    const { id, deck, navigation } = this.props

    navigation.navigate(
      'Quiz',
      { id, title: deck.title, quizIndex: 0, totalQuizes: deck.questions.length }
    )
  }

  render() {
    const { id, deck, loading } = this.props
    const { showModal, iconConfig } = this.state

    if (!showModal && (loading || !deck)) {
      return (
        <Loading />
      )
    }

    return (
      <View style={ styles.container}>
        <WaitingModal
          visible={ showModal }
          message={ `Deleting "${deck.title}" deck. Please wait... ` }
          onRequestClose={ () => {
            this.setState({
              showModal: false
            })
          } }
        />
        <View style={ styles.detiailsBlock }>
          <Text style={ deckStyles.title }>{ deck.title }</Text>
          <Text style={ deckStyles.details }>{ cardsLabel(deck.questions.length) }</Text>
        </View>
        <View style={ buttons.buttonBlockAtBottom }>
          <TouchableOpacity
            style={ [buttons.base, buttons.primary, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.onAddCard() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [buttons.base, buttons.correct, buttons.oneLine, buttons.bottomButton] }
            onPress={ () => this.onStartQuiz() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Start Quiz
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

const mapStateToProps = ({ deck, decks, loading }, { route }) => {
  const { id, title } = route?.params || {}

  return {
    id,
    title,
    deck,
    decks,
    loading
  }
}

const mapDispatchToProps = {
  handleGetDeck,
  handleDeleteDeck
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails)