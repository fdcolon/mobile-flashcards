import { dummyDecks } from './_ORIGINAL_DATA'

export const FLASHCARDS_STORAGE_KEY = 'FernandoMobileFlashCards:main'

export const initialData = startEmpty => {
  return !startEmpty
    ? dummyDecks
    : {}
}