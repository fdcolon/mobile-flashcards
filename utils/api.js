import { AsyncStorage } from 'react-native'
import { camelCase as _camelCase } from 'lodash'

import { FLASHCARDS_STORAGE_KEY, initialData } from './_DATA'

export const setInitialData = async startEmpty => {
  const data = {
    flashcards: {
      ...initialData(startEmpty)
    }
  }
  await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
  return data.flashcards
}

export const resetData = async () => {
  const data = {
    flashcards: null
  }
  await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
  return data.flashcards
}

export const retrieveDecks = async () => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))

  return data?.flashcards
    ? data.flashcards
    : null
}

export const retrieveDeck = async id => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const deck = data?.flashcards[id] || null

  return deck
}

export const saveDeckTitle = async title => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const decks = data?.flashcards || {}
  const id = _camelCase(title)

  const newData = {
    flashcards: {
      ...decks,
      [id]: {
        title,
        questions: []
      }
    }
  }

  await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newData))

  return newData.flashcards
}

export const updateDeckTitle = async (id, title) => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const decks = data.flashcards

  const newData = {
    flashcards: {
      ...decks,
      [id]: {
        ...decks[id],
        title
      }
    }
  }

  await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newData))

  return newData.flashcards
}

export const removeDeck = async id => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const decks = data.flashcards
  delete decks[id]

  const newData = {
    flashcards: {
      ...decks
    }
  }

  await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newData))

  return newData.flashcards
}

export const addCardToDeck = async (title, card) => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const decks = data.flashcards
  let deckId

  Object.keys(decks).forEach(key => {
    if (decks[key].title === title) {
      deckId = key
    }
  })

  const newData = {
    flashcards: {
      ...decks,
      [deckId]: {
        ...decks[deckId],
        questions: decks[deckId].questions.concat(card)
      }
    }
  }

  await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newData))

  return {
    decks: newData.flashcards,
    deck: newData.flashcards[deckId]
  }
}

export const saveAnswerToQuiz = async (deckId, questionNumber, answer) => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const decks = data.flashcards
  const deck = decks[deckId]
  const questionId = questionNumber - 1
  const totalQuestions = deck.questions.length

  deck.questions[questionId].quizAnswer = answer

  const newData = {
    flashcards: {
      ...decks,
      [deckId]: {
        ...deck,
        questions: deck.questions,
        answeredOn: questionNumber === totalQuestions
          ? new Date()
          : null
      }
    }
  }

  await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newData))

  return {
    decks: newData.flashcards,
    deck: newData.flashcards[deckId]
  }
}

export const resetQuiz = async (deckId) => {
  const data = JSON.parse(await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  const decks = data.flashcards
  const deck = decks[deckId]

  const updatedQuestions = deck.questions.map(item => {
    return {
      ...item,
      quizAnswer: null
    }
  })

  const newData = {
    flashcards: {
      ...decks,
      [deckId]: {
        ...deck,
        questions: updatedQuestions,
        answeredOn: null
      }
    }
  }

  await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newData))

  return {
    decks: newData.flashcards,
    deck: newData.flashcards[deckId]
  }
}
