import React from 'react'
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

import { white } from '../../utils/colors'

const HeaderRightButton = ({ type, label, onPress, backgroundColor, color = white }) => {
  const renderIcon = (type, color, size) => {
    switch (type) {
      case 'delete':
        return Platform.OS === 'ios'
          ? <Ionicons name="trash" size={ size } color={ color } style={ styles.iconSpacing } />
          : <FontAwesome name="trash" size={ size } color={ color } style={ styles.iconSpacing } />
      case 'edit':
        return Platform.OS === 'ios'
          ? <Ionicons name="trash" size={ size } color={ color } style={ styles.iconSpacing } />
          : <FontAwesome name="trash" size={ size } color={ color } style={ styles.iconSpacing } />
      default:
        return
    }
  }

  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ [
        styles.row,
        backgroundColor ? { backgroundColor: backgroundColor } : ''
      ] }
    >
      { renderIcon(type, color, 16) }
      <Text style={{ color: color }}>{ label }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingRight: 16,
    flexDirection: 'row'
  },
  iconSpacing: {
    paddingRight: 8
  }
})

export default HeaderRightButton