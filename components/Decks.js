import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { isEmpty as _isEmpty } from 'lodash'

import DeckCard from './DeckCard'

import { formatDeckResults } from '../utils/helpers'
import { white, lightGray, blue, black } from '../utils/colors'
import { common } from '../styles'

class Decks extends Component {
  state = {
    isLoading: true
  }

  componentDidMount () {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const { decks } = this.props
    const { isLoading } = this.state

    if (isLoading) {
      return (
        <View style={ common.center }>
          <ActivityIndicator size="large" color={ blue } />
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <ScrollView style={ _isEmpty(decks) ? deckStyles.container : '' }>
        { _isEmpty(decks) && (
          <View style={ common.center }>
            <Text style={ common.label }>
              There are no decks registered. Please add one! ✌️😎
            </Text>
          </View>
        ) }
        { !_isEmpty(decks) && decks.map(deck => (
          <View key={ deck.id } style={ deckStyles.card }>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate(
              'Deck Details',
              { id: deck.id, title: deck.title }
            ) }>
              <DeckCard
                title={ deck.title }
                totalCards={ deck.totalCards }
              />
            </TouchableOpacity>
          </View>
        )) }
      </ScrollView>
    )
  }
}

export const deckStyles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16
  },
  card: {
    backgroundColor: white,
    borderRadius: 8,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
    justifyContent: 'center',
    shadowRadius: 4,
    shadowOpacity: 0.8,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5
  },
  title: {
    fontSize: 28
  },
  details: {
    paddingTop: 8,
    fontSize: 18,
    color: lightGray
  },
  button: {
    marginBottom: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 36,
    paddingRight: 36
  }
})

const mapStateToProps = ({ decks, loading }) => {
  return {
    decks: formatDeckResults(decks),
    loading
  }
}

export default connect(
  mapStateToProps
)(Decks)