import { isEmpty as _isEmpty } from 'lodash'

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