import {
  START_LOADING,
  STOP_LOADING,
  FETCH_DECKS,
  FETCH_DECK,
  ADD_DECK,
  UPDATE_DECK,
  DELETE_DECK,
  ADD_CARD,
  SAVE_QUIZ_ANSWER,
  RESET_QUIZ
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
    case FETCH_DECK:
      return {
        ...state,
        deck: action.deck
      }
    case FETCH_DECKS:
    case ADD_DECK:
    case UPDATE_DECK:
    case DELETE_DECK:
      return {
        ...state,
        decks: action.decks
      }
    case ADD_CARD:
    case SAVE_QUIZ_ANSWER:
    case RESET_QUIZ:
      return {
        ...state,
        decks: action.decks,
        deck: action.deck
      }
      default:
      return state
  }
}