import {
  setInitialData,
  resetData,
  retrieveDecks,
  retrieveDeck,
  saveDeckTitle,
  updateDeckTitle,
  removeDeck,
  addCardToDeck,
  saveAnswerToQuiz,
  resetQuiz
} from '../../utils/api'

export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const FETCH_DECKS = 'FETCH_DECKS'
export const FETCH_DECK = 'FETCH_DECK'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SAVE_QUIZ_ANSWER = 'SAVE_QUIZ_ANSWER'
export const RESET_QUIZ = 'RESET_QUIZ'

const startLoading = () => {
  return {
    type: START_LOADING,
    isLoading: true
  }
}

const stopLoading = () => {
  return {
    type: STOP_LOADING,
    isLoading: false
  }
}

const getDecks = decks => {
  return {
    type: FETCH_DECKS,
    decks
  }
}

export const handleSetInitialData = startEmpty => {
  return dispatch => {
    dispatch(startLoading())

    return (setInitialData(startEmpty))
      .then(decks => {
        dispatch(getDecks(decks))
        dispatch(stopLoading())
      })
  }
}

export const handleResetData = () => {
  return dispatch => {
    dispatch(startLoading())

    return (resetData())
      .then(decks => {
        dispatch(getDecks(decks))
        dispatch(stopLoading())
      })
  }
}

export const handleGetDecks = () => {
  return dispatch => {
    dispatch(startLoading())

    return (retrieveDecks())
      .then(decks => {
        dispatch(getDecks(decks))
        dispatch(stopLoading())
      })
  }
}

const getDeck = (deck) => {
  return {
    type: FETCH_DECK,
    deck
  }
}

export const handleGetDeck = id => {
  return dispatch => {
    dispatch(startLoading())

    return (retrieveDeck(id))
      .then(deck => {
        dispatch(getDeck(deck))
        dispatch(stopLoading())
      })
  }
}

const postDeck = decks => {
  return {
    type: ADD_DECK,
    decks
  }
}

export const handlePostDeck = (title) => {
  return dispatch => {
    dispatch(startLoading())

    return (saveDeckTitle(title))
      .then(decks => {
        dispatch(postDeck(decks))
        dispatch(stopLoading())
      })
  }
}

const putDeck = decks => {
  return {
    type: UPDATE_DECK,
    decks
  }
}

export const handlePutDeck = (id, title) => {
  return dispatch => {
    dispatch(startLoading())

    return (updateDeckTitle(id, title))
      .then(decks => {
        dispatch(putDeck(decks))
        dispatch(stopLoading())
      })
  }
}

const deleteDeck = decks => {
  return {
    type: DELETE_DECK,
    decks
  }
}

export const handleDeleteDeck = id => {
  return dispatch => {
    dispatch(startLoading())

    return (removeDeck(id))
      .then(decks => {
        dispatch(deleteDeck(decks))
        dispatch(stopLoading())
      })
  }
}

const postCard = (decks, deck) => {
  return {
    type: ADD_CARD,
    decks,
    deck
  }
}

export const handlePostCard = (title, card) => {
  return dispatch => {
    dispatch(startLoading())

    return (addCardToDeck(title, card))
      .then(({ decks, deck }) => {
        dispatch(postCard(decks, deck))
        dispatch(stopLoading())
      })
  }
}

const postAnswer = (decks, deck) => {
  return {
    type: SAVE_QUIZ_ANSWER,
    decks,
    deck
  }
}

export const handlePostAnswer = (deckId, questionNumber, answer) => {
  return dispatch => {
    dispatch(startLoading())

    return (saveAnswerToQuiz(deckId, questionNumber, answer))
      .then(({ decks, deck }) => {
        dispatch(postAnswer(decks, deck))
        dispatch(stopLoading())
      })
  }
}

const deleteQuiz = (decks, deck) => {
  return {
    type: RESET_QUIZ,
    decks,
    deck
  }
}

export const handleResetQuiz = deckId => {
  return dispatch => {
    dispatch(startLoading())

    return (resetQuiz(deckId))
      .then(({ decks, deck }) => {
        dispatch(deleteQuiz(decks, deck))
        dispatch(stopLoading())
      })
  }
}