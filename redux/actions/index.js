import {
  setInitialData,
  resetData,
  retrieveDecks,
  retrieveDeck,
  saveDeckTitle,
  updateDeckTitle,
  removeDeck,
  addCardToDeck,
  removeCardFromDeck
} from '../../utils/api'

export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const FETCH_DECKS = 'FETCH_DECKS'
export const FETCH_DECK = 'FETCH_DECK'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'

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

export const handleSetInitialData = () => {
  return dispatch => {
    dispatch(startLoading())

    return (setInitialData())
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

const getDeck = (deck, decks) => {
  return {
    type: FETCH_DECK,
    deck,
    decks
  }
}

export const handleGetDeck = id => {
  return (dispatch, getState) => {
    dispatch(startLoading())
    const { decks } = getState()

    return (retrieveDeck(id))
      .then(deck => {
        dispatch(getDeck(deck, decks))
        dispatch(stopLoading())
      })
  }
}

const postDeck = (decks) => {
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

const putDeck = ({ id, title }) => {
  return {
    type: UPDATE_DECK,
    id,
    title
  }
}

export const handlePutDeck = (id, title) => {
  return dispatch => {
    dispatch(startLoading())

    return (updateDeckTitle(id, title))
      .then(() => {
        dispatch(putDeck(id, title))
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
      .then((decks) => {
        dispatch(deleteDeck(decks))
        dispatch(stopLoading())
      })
  }
}

const postCard = (decks, deckId, card) => {
  return {
    type: ADD_CARD,
    decks,
    deckId,
    card
  }
}

export const handlePostCard = (title, card) => {
  return (dispatch, getState) => {
    dispatch(startLoading())
    const { decks } = getState()

    return (addCardToDeck(title, card))
      .then((deckId) => {
        dispatch(postCard(decks, deckId, card))
        dispatch(stopLoading())
      })
  }
}

export const deleteCard = ({ deckId, card }) => {
  return {
    type: DELETE_CARD,
    deckId,
    card
  }
}
