import { StyleSheet } from 'react-native'

import {
  blue,
  blueBorder,
  white,
  black,
  green,
  greenBorder,
  red,
  redBorder
} from '../utils/colors'

export const common = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 20
  }
})

export const buttons = StyleSheet.create({
  base: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: black
  },
  primary: {
    backgroundColor: blue,
    borderColor: blueBorder
  },
  secondary: {
    backgroundColor: white,
  },
  correct: {
    backgroundColor: green,
    borderColor: greenBorder
  },
  incorrect: {
    backgroundColor: red,
    borderColor: redBorder
  },
  disabled: {
    opacity: .6
  },
  oneLine: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16
  },
  labelLight: {
    color: white
  },
  labelDark: {
    color: black
  },
  buttonBlockAtBottom: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: -16,
    marginLeft: -16,
    marginRight: -16
  },
  bottomButton: {
    flex: 1,
    padding: 16,
    borderRadius: 0,
    textAlign: 'center',
    justifyContent: 'center'
  },
})

export const inputs = StyleSheet.create({
  base: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: black,
    backgroundColor: white,
    fontSize: 18
  }
})