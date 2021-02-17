import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { isEmpty as _isEmpty } from 'lodash'

import DeckCard from './DeckCard'

import { formatDeckResults } from '../utils/helpers'
import { white, lightGray, blue } from '../utils/colors'
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
      <ScrollView>
        { decks.map(deck => (
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
  card: {
    backgroundColor: white,
    borderRadius: 8,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
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