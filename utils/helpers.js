import { isEmpty as _isEmpty } from 'lodash'

export const formatDeckResults = decks => {
  console.log
  return _isEmpty(decks)
    ? []
    : Object.keys(decks).map(key => ({
      id: key,
      title: decks[key].title,
      totalCards: decks[key].questions.length
    }))
}

export const cardsLabel = (total) => {
  switch (total) {
    case 0:
      return 'No registered cards'
    case 1:
      return `${total} card`
    default:
      return `${total} cards`
  }
}