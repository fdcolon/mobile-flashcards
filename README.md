# Mobile Flashcards App

**Mobile Flashcards** is a project requested by Udacity in order to get the third and last grade for the **React Nanodegree Program**. It is focused in develop a mobile app, using **React Native**, that allows the user display a set of decks (if any), create new decks, remove decks, add cards to decks, answer deck's quizes, and view results after answering a quiz.

## Installation

> :warning: If you don't have `yarn` installed in your computer, please type the following in your terminal:

```
> npm install --global yarn
```

> :warning: If you don't have `expo` installed in your computer, please type the following in your terminal:

```
> npm install --global expo-cli
```

Clone the GitHub repository, use `yarn` to install the dependencies.

```
> git clone https://github.com/fdcolon/mobile-flashcards.git
> cd mobile-flashcards
> yarn install
```

## Usage

To run the **Mobile Flashcards** app, just type the following into your terminal:

```
> expo start
```

This will start a browser with expo running. Click on the `Tunnel` button on the **Connection** section and hit the **Production Mode** switch. Then, just scan the QR code from your device to see the app running.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/expo-page.png" width="600">

### Welcome

Once the app is running, the first view you will see is a **Welcome** screen where you will be requested to define how would you like to start the mobile app: With empty data or with preset data.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/welcome.png" width="300">

**Figure 1** - Welcome Page

### Main Screen

Once you select an option, you will be redirected to the `Main` screen where you will see two tabs:
  * `Decks`, which displays the list of the existing Decks and the number of cards per deck. (**DEFAULT view**)
  * `Add Deck`, which allows you to create a new deck.

If you decide to `Start with empty data`, then you will see the following screen:

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/empty-data.png" width="300">

**Figure 2** - Decks screen with empty data

Otherwise, if you decide to `Start with preset data`, this will be the screen you will see:

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/decks-01.png" width="300">

**Figure 3** - Decks screen with preset data

### Adding a New Deck

To create a new deck, just tap on the tab with the label `Add Deck` to mode to the corresponding form.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-deck-01.png" width="300">

**Figure 4** - Add Deck form

> :warning: The `Create Deck` button will be enabled ONLY when you type a title (name) for that deck.

Just tap on the text input to type the title for your new deck.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-deck-02.png" width="300">

**Figure 5** - Setting the title for the New Deck

Once you done with the title, just tap on the `Create Deck` button to save it. This will display a modal to let you know the data is being processed.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-deck-03.png" width="300">

**Figure 6** - Processing New Deck data

Once the data has been processed, you will be redirected to the `Decks` tab where you will see your new created deck.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-deck-04.png" width="300">

**Figure 7** - New Deck added

### Deck Details

If you would like to see the details of a deck, just click on the card of the desired deck and you will be redirected to the details screen. For example, let's select the new created deck.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/deck-details-01.png" width="300">

**Figure 8** - Deck details

To go back to the `Decks` screen, just tap on the back button located at the top-left of the screen.

### Adding Cards

Each deck should have a set of cards in order to start a quiz. To add a new card, just tap on the `Add Card` button to be redirected to the corresponding form.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-01.png" width="300">

**Figure 9** - Add Card form

> :warning: The `Submit` button will be enabled ONLY when you type a `question` and it's `answer`.

Type a question and an answer and specify if that sentence is `Correct` or `Incorrect` by tapping on the corresponding radio buttons.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-02.png" width="300">

**Figure 10** - Filling the Add Card form

Once you have done with your new card data, tap on the `Submit` button to add your new card into the deck. This will display a modal to let you know the data is being processed.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-03.png" width="300">

**Figure 11** - Processing New Card data

Once the data has been processed, you will be redirected to the `Deck Details` screen where you will see that your deck now has `1 Card`.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-04.png" width="300">

**Figure 12** - New Card added

As many cards as you add, they will be reflected into the `Deck Details` screen.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-05.png" width="300">

**Figure 13** - Deck Details with total cards

### Starting a Quiz

Once you added cards to a deck, you are ready to start a quiz by tapping on the `Start Quiz >` button. This will redirect you to the `Quiz` screen where you will see each card in order to answer them.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/start-quiz-02.png" width="300">

**Figure 14** - Starting a Quiz

> :rotating_light: If you tap on the `Start Quiz >` button with NO CARDS added to the deck, you will get the following screen:

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/start-quiz-01.png" width="300">

**Figure 15** - Starting a Quiz with empty cards

On the `Quiz` screen you will notice that there is the indicator of the card number you are solving, the question, a `View answer` label and two buttons to set your answer: `Correct`and `Incorrect`. In order to define your answer, read carefully the question and then tap on the `View Answer` label in order to flip the card and view the corresponding answer.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/start-quiz-03.png" width="300">

**Figure 16** - Flipping quiz card

> :warning: To view again the question, just tap on the `View Question` label to flip back the card.

Once you are ready to set your answer, just tap on the corresponding button to move to the next quiz card. This will display a modal to let you know the data is being processed.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/start-quiz-04.png" width="300">

**Figure 17** - Processing Quiz Card answer

When you solve the last quiz card, you will be redirected to the `Results` screen where you will see the total hits and your score followed by a motivational quote.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/view-results-01.png" width="300">

**Figure 18** - View results - Score 100%

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/view-results-02.png" width="300">

**Figure 19** - View results - Score between 80% and 99%

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/view-results-03.png" width="300">

**Figure 20** - View results - Score between 60% and 79%

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/view-results-04.png" width="300">

**Figure 21** - View results - Score lower than 60%

Also, you have two options (buttons) at the bottom to continue using the app:
  * `Restart Quiz`, will reset the quiz and start it again from question 1.
  * `Back to Deck`, will redirect you to the  `Deck Details` screen.

### Adding Cards after a Quiz has been solved

In case you would like to add a new card to a deck that previously has been solved, then you will be notified that the quiz will be reset and also you will be requested to confirm or reject that action.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-06.png" width="300">

**Figure 22** - Reset Quiz confirm

If you decide to proceed, the quiz will be reset and you will be redirect to the `Add Card` screen.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-07.png" width="300">

**Figure 23** - Resetting Quiz

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-08.png" width="300">

**Figure 24** - Add Card after reset quiz

If you tap on the `Start Quiz >` button, you will see the new card added by checking the total cards to solve.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-card-09.png" width="300">

**Figure 25** - Start Quiz with new card added

### Deleting Decks

In case you would like to remove a deck, first go to the `Decks` view and select a deck to delete by tapping in the corresponding card.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/delete-deck-01.png" width="300">

**Figure 26** - Select deck to delete

On the `Deck Details^` screen, look for the `Delete` option located at the top-right of the screen and tap on it. This will display a confirmation modal asking you if do you really want to proceed with this action.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/delete-deck-02.png" width="300">

**Figure 27** - Delete Deck confirmation

If you proceed, then it will be displayed a modal letting you know the deck is being deleted.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/delete-deck-02.png" width="300">

**Figure 28** - Deleting Deck

Finally, once the deck is deleted, you will be redirected to the `Decks` screen noticing the dec has been removed from the list.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/add-deck-04.png" width="300">

**Figure 29** - Updated Decks screen

### Notifications
This mobile app is configured to send a notification to the user daily at 9:00 am if the user hasn't solve any quiz today.

<img src="https://github.com/fdcolon/mobile-flashcards/blob/main/images/notification-01.png" width="300">

**Figure 30** - Notifications

However, if the user already solve a quiz before 9:00 am, then the notification will be cancelled and scheduled for the next day.


## Notes

- Deleting Decks was not required in the Rubric.
- Loading/Processing modals were not required in the Rubric.
- Added api method `resetData` for testing purposes such as verify the `Welcome` screen was working as expected.
- Added api method `updateDeckTitle` because it was planned to add that behavior but I wasn't able to find a place where to put an option to do that action into the `Deck Details` screen. However, my plan is to add that behavior later.

## License

This App is Copyright © 2021 Fernando Daniel Colon Gonzalez and thoughtbot. It is free software, and may be redistributed under the terms specified in the [LICENSE](https://github.com/fdcolon/mobile-flashcards/blob/main/LICENSE) file.