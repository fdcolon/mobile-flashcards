import React from 'react'
import { View, Text } from 'react-native'

import { deckStyles } from './Decks'
import { cardsLabel } from '../utils/helpers'

const DeckCard = (props) => {
  const { title, totalCards } = props

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={ deckStyles.title }>{ title }</Text>
      <Text style={ deckStyles.details }>{ cardsLabel(totalCards) }</Text>
    </View>
  )
}

export default DeckCard