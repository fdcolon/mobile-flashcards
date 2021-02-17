import React from 'react'
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { common } from '../../styles'
import { blue, black, white } from '../../utils/colors'

const WaitingModal = ({ visible, message, onRequestClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={ true }
      visible={ visible }
      onRequestC
      lose={ () => onRequestClose() }
    >
      <View style={ [common.center, styles.container] }>
        <View style={ styles.card } >
          <ActivityIndicator size="large" color={ blue } />
          <Text>{ message }</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  card: {
    padding: 16,
    borderWidth: 3,
    borderRadius: 4,
    borderColor: black,
    backgroundColor: white
  }
})

export default WaitingModal