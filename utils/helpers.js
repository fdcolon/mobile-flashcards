import { AsyncStorage, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'

import { isEmpty as _isEmpty } from 'lodash'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const formatDeckResults = decks => {
  return _isEmpty(decks)
    ? []
    : Object.keys(decks).map(key => ({
      id: key,
      title: decks[key].title,
      totalCards: decks[key].questions.length
    }))
}

export const cardsLabel = total => {
  switch (total) {
    case 0:
      return 'No registered cards'
    case 1:
      return `${total} card`
    default:
      return `${total} cards`
  }
}

export const formatQuizResults = ({ questions }) => {
  let totalScore = 0

  questions.forEach(item => {
    if (item.isCorrect === item.quizAnswer) {
      totalScore++
    }
  })

  return {
    totalScore,
    percentage: Math.round(totalScore * 100 / questions.length)
  }
}

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY)
  await Notifications.cancelAllScheduledNotificationsAsync()
}

const setupNotification = async (trigger, newData) => {
  await Notifications.cancelAllScheduledNotificationsAsync()

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF0000'
    })
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Mobile Flashcards',
      body: `☕️ Good morning! Let's solve a quiz today!`,
      sound: 'default',
      priority: 'high'
    },
    trigger
  })

  await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(newData))
}

export const setDailyNotification = async () => {
  const data = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY))
  const today = new Date()
  let trigger
  let newData

  if (data && data.repeatMode === 'tomorrow' && today < new Date(data.repeatAt)) {
    trigger = {
      date: new Date(data.repeatAt)
    }
    newData = data
  } else {
    trigger = {
      hour: 9,
      minute: 0,
      repeats: true
    }
  
    newData = {
      repeatMode: 'daily'
    }
  }

  setupNotification(trigger, newData)
}

export const setTomorrowNotification = async () => {
  const data = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY))
  const today = new Date()

  if (data.repeatMode === 'daily' && today.getHours() < 9) {
    const notificationDate = new Date()
    notificationDate.setDate(notificationDate.getDate() + 1)
    notificationDate.setHours(9)
    notificationDate.setMinutes(0)
    notificationDate.setSeconds(0)

    const trigger = {
      date: notificationDate
    }
  
    const newData = {
      repeatMode: 'tomorrow',
      repeatAt: notificationDate,
      trigger
    }
  
    setupNotification(trigger, newData)
  }
}

/**
 Possible types for "trigger" property:
 
 TimeIntervalTriggerInput {
    channelId?: string;
    repeats?: boolean;
    seconds: number;
  }

  DailyTriggerInput {
    channelId?: string;
    hour: number;
    minute: number;
    repeats: true;
  }

  WeeklyTriggerInput {
    channelId?: string;
    weekday: number;
    hour: number;
    minute: number;
    repeats: true;
  }

  DateTriggerInput = Date | number | {
    channelId?: string;
    date: Date | number;
  }
 */
