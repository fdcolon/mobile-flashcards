import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { cardsLabel } from '../utils/helpers'
import { lightGray } from '../utils/colors'

const DeckCard = (props) => {
  const { title, totalCards } = props

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={ styles.title }>{ title }</Text>
      <Text style={ styles.details }>{ cardsLabel(totalCards) }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28
  },
  details: {
    paddingTop: 8,
    fontSize: 18,
    color: lightGray
  }
})

export default DeckCard