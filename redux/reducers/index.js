import {
  FETCH_DECKS,
  FETCH_DECK,
  ADD_DECK,
  UPDATE_DECK,
  DELETE_DECK,
  ADD_CARD,
  DELETE_CARD,
  START_LOADING,
  STOP_LOADING
} from '../actions'

const initialState = {
  loading: true
}

export default store = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
    case STOP_LOADING:
      return {
        ...state,
        loading: action.isLoading
      }
    case FETCH_DECKS:
      return {
        ...state,
        decks: action.decks
      }
    case FETCH_DECK:
      return {
        ...state,
        deck: action.deck
      }
    case ADD_DECK:
      return {
        ...state,
        decks: action.decks
      }
    case UPDATE_DECK:
      const { id, title } = action
      return {
        ...state,
        decks: {
          ...state,
          [id]: {
            ...[id],
            title
          }
        }
      }
    case DELETE_DECK:
      return {
        ...state,
        decks: action.decks
      }
    case ADD_CARD:
      const { decks, deckId, card } = action
      return {
        ...state,
        decks: {
          ...decks,
          [deckId]: {
            ...decks[deckId],
            questions: decks[deckId].questions.concat(card)
          }
        },
        deck: {
          ...decks[deckId],
          questions: decks[deckId].questions.concat(card)
        }
      }
    case DELETE_CARD:
      const { deckId: idDeck, card: cardData } = action
      return {
        ...state,
        decks: {
          ...state,
          [idDeck]: {
            ...[idDeck],
            questions: state[idDeck].questions.filter(deckCard => deckCard.question !== cardData.question)
          }
        }
      }
    default:
      return state
  }
}