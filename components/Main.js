import React, { Component } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { isEmpty as _isEmpty } from 'lodash'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import Loading from './helpers/Loading'
import Welcome from './Welcome'
import Decks from './Decks'
import AddDeck from './AddDeck'
import DeckDetails from './DeckDetails'
import AddCard from './AddCard'
import Quiz from './Quiz'
import Results from './Results'

import { handleGetDecks, handleResetData } from '../redux/actions'
import { blue, white } from '../utils/colors'

class Main extends Component {
  state = {
    isLoading: true
  }

  componentDidMount () {
    const { decks, handleGetDecks, handleResetData } = this.props
    // handleResetData()

    if (decks === undefined) {
      handleGetDecks()
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  componentDidUpdate () {
    const { isLoading } = this.state

    if (isLoading) {
      this.setState({
        isLoading: false
      })
    }
  }

  componentWillUnmount () {
    this.setState(() => {
      return
    })
  }

  render() {
    const { isLoading } = this.state
    const { isFirstTime } = this.props

    if (isLoading) {
      return (
        <Loading />
      )
    }

    if (isFirstTime) {
      return (
        <View style={ styles.container }>
          <Welcome />
        </View>
      )
    }

    return (
      <NavigationContainer style={{ flex: 1 }}>
        <MainNavigator.Navigator initialRouteName="Home">
          <MainNavigator.Screen { ...stackNavigatorConfig['Home'] } />
          <MainNavigator.Screen { ...stackNavigatorConfig['DeckDetails'] } />
          <MainNavigator.Screen { ...stackNavigatorConfig['AddCard'] } />
          <MainNavigator.Screen { ...stackNavigatorConfig['Quiz'] } />
          <MainNavigator.Screen { ...stackNavigatorConfig['Results'] } />
        </MainNavigator.Navigator>
      </NavigationContainer>
    )
  }
}

const routesConfig = {
  Decks: {
    name: 'Decks',
    component: Decks,
    options: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name="folder-open" size={ 30 } color={ tintColor } />
    }
  },
  AddDeck: {
    name: 'Add Deck',
    component: AddDeck,
    options: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name="folder-plus" size={ 30 } color={ tintColor } />
    }
  }
}

const tabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNavigator = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator()

const Tab = () => {
  return (
    <TabNavigator.Navigator { ...tabNavigatorConfig }>
      <TabNavigator.Screen { ...routesConfig['Decks'] } />
      <TabNavigator.Screen { ...routesConfig['AddDeck'] } />
    </TabNavigator.Navigator>
  )
}

const headerOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: blue
  }
}

const stackNavigatorConfig = {
  Home: {
    name: 'Home',
    component: Tab,
    options: {
      headerShown: false
    }
  },
  DeckDetails: {
    name: 'Deck Details',
    component: DeckDetails,
    options: headerOptions
  },
  AddCard: {
    name: 'Add Card',
    component: AddCard,
    options: headerOptions
  },
  Quiz: {
    name: 'Quiz',
    component: Quiz,
    options: headerOptions
  },
  Results: {
    name: 'Results',
    component: Results,
    options: headerOptions
  }
}

const MainNavigator = createStackNavigator()
  
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = ({ decks }) => {
  return {
    decks,
    isFirstTime: !decks
  }
}

const mapDispatchToProps = {
  handleGetDecks,
  handleResetData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)