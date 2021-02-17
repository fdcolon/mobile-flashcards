import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Pressable, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { black, blue } from '../../utils/colors'

const RadioButtonsSet = ({ options, checkedOption, onSelect, orientation = 'row' }) => {
  return (
    <View style={ orientation === 'row' ? styles.rowContainer : styles.columnContainer }>
      { options.map((option) => {
        return (
          <View
            key={ option.id }
            style= { styles.row }
          >
            <TouchableOpacity
              style={ Platform.OS === 'ios' ? styles.radioButtoniOS : styles.radioButtonAndroid }
              onPress={ () => onSelect(option.value) }>
              { checkedOption === option.value && Platform.OS === 'ios' && (
                <Ionicons name="checkmark" size={ 24 } color={ blue } />
              ) }
              { checkedOption === option.value && Platform.OS !== 'ios' && (
                <View style={ styles.checkedOptionAndroid } />
              ) }
            </TouchableOpacity>
            <Pressable onPress={ () => onSelect(option.value) }>
              <Text style={ styles.label }>{ option.label }</Text>
            </Pressable>
          </View>
        )
      }) }
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  columnContainer: {
    marginTop: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioButtonAndroid: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  checkedOptionAndroid: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: blue
  },
  radioButtoniOS: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  label: {
    fontSize: 20
  }
})

export default RadioButtonsSet