import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import RadioButtonsSet from './helpers/RadioButtonsSet'
import WaitingModal from './helpers/WaitingModal'

import { handlePostCard } from '../redux/actions'

import { common, inputs, buttons } from '../styles'

class AddCard extends Component {
  state = {
    showModal: false,
    question: '',
    answer: '',
    isCorrect: true,
    radioOptions: [
      {
        id: 'correct',
        label: 'Correct',
        value: true
      },
      {
        id: 'incorrect',
        label: 'Incorrect',
        value: false
      }
    ]
  }

  componentDidMount () {
    const { title } = this.props

    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerBackTitle: title,
      headerBackTitleVisible: true
    })
  }

  componentDidUpdate () {
    const { loading } = this.props
    const { showModal } = this.state

    if (loading && !showModal) {
      this.setState({
        showModal: true
      })
    } else if (!loading && showModal) {
      this.setState({
        showModal: false
      })
      this.goBack ()
    }
  }

  onInputChange (isQuestion, value) {
    const { question, answer } = this.state

    this.setState({
      question: isQuestion ? value : question,
      answer: !isQuestion ? value : answer
    })
  }

  onSelectOption (isCorrect) {
    this.setState(() => ({
      isCorrect
    }))
  }

  goBack () {
    const { navigation } = this.props
    navigation.goBack()
  }

  onAddCard () {
    const { title, handlePostCard } = this.props
    const { question, answer, isCorrect } = this.state

    handlePostCard(title, { question, answer, isCorrect })
  }

  render() {
    const { question, answer, isCorrect, radioOptions, showModal } = this.state

    return (
      <View style={ cardStyles.container }>
        <WaitingModal
          visible={ showModal }
          message="Submitting data. Please wait..."
          onRequestClose={ () => {
            this.setState({
              showModal: false
            })
          } }
        />

        <View style={ cardStyles.inputsBlock }>
          <TextInput
            style={ [inputs.base, cardStyles.input] }
            placeholder="Type a question"
            onChangeText={ value => this.onInputChange(true, value) }
            value={ question }
          />
          <TextInput
            style={ [inputs.base, cardStyles.input] }
            placeholder="Type an answer"
            onChangeText={ value => this.onInputChange(false, value) }
            value={ answer }
          />
          <Text style={ common.label }>The sentence is:</Text>
          <RadioButtonsSet
            options={ radioOptions }
            checkedOption={ isCorrect }
            onSelect={ (option) => this.onSelectOption(option) }
          />
        </View>
        <View style={ buttons.buttonBlockAtBottom }>
          <TouchableOpacity
            style={ [
              buttons.base,
              buttons.secondary,
              buttons.oneLine,
              buttons.bottomButton
            ] }
            onPress={ () => this.goBack() }
          >
            <Text style={ [buttons.label, buttons.labelDark] }>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [
              buttons.base,
              buttons.primary,
              buttons.oneLine,
              buttons.bottomButton,
              (!question || !answer ? buttons.disabled : '')
            ] }
            disabled={ !question || !answer }
            onPress={ () => this.onAddCard() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start'
  },
  inputsBlock: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginBottom: 16
  }
})

const mapStateToProps = ({ loading, deck }, { route }) => {
  const { id, title } = route.params

  return {
    id,
    title,
    deck,
    loading
  }
}

const mapDispatchToProps = {
  handlePostCard
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)