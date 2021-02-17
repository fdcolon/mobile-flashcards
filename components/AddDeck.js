import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import WaitingModal from './helpers/WaitingModal'

import { handlePostDeck } from '../redux/actions'

import { common, inputs, buttons } from '../styles'

class AddDeck extends Component {
  state = {
    showModal: false,
    title: ''
  }

  componentDidUpdate () {
    const { loading } = this.props
    const { showModal } = this.state

    if (!loading && showModal) {
      this.setState({
        showModal: false,
        title: ''
      })
      this.goBack ()
    }
  }

  onInputChange (title) {
    this.setState({
      title
    })
  }

  goBack () {
    const { navigation } = this.props
    navigation.goBack()
  }

  onAddDeck () {
    const { handlePostDeck } = this.props
    const { title } = this.state

    handlePostDeck(title)

    this.setState({
      showModal: true
    })
  }

  render() {
    const { title, showModal } = this.state

    return (
      <View style={ styles.container }>
        <WaitingModal
          visible={ showModal }
          message="Creating new Deck. Please wait..."
          onRequestClose={ () => {
            this.setState({
              showModal: false
            })
          } }
        />

        <View style={ styles.inputsBlock }>
          <Text style={ common.label } >
            What is the title of your new deck?
          </Text>
          <TextInput
            style={ [inputs.base, styles.input] }
            placeholder="Deck Title"
            onChangeText={ value => this.onInputChange(value) }
            value={ title }
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
              (!title ? buttons.disabled : '')
            ] }
            disabled={ !title }
            onPress={ () => this.onAddDeck() }
          >
            <Text style={ [buttons.label, buttons.labelLight] }>
              Create Deck
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

const mapStateToProps = ({ loading }) => {
  return {
    loading
  }
}

const mapDispatchToProps = {
  handlePostDeck
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck)