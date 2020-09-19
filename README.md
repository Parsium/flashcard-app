React flashcard app allowing you to load a deck of questions and test your knowledge, similar to Quizlet and Anki. 

# How to use
A deck is written and represented as a JSON file, which can be then be imported into the app on launch. Decks must follow a specific schema to be read correctly - the following example is a deck containing one question, in the correct structure:

```json
[
    {
        "id": 99,
        "question": "What is the name of the little dragon in the animated movie Mulan?",
        "answer": "mushu"
    }
]
```

*Note - check your deck is written as an array, else you will encounter errors being thrown!*

# Project takeaways
This project has allowed me to practice some more with:
- Conceiving and writing *good* unit tests (by watching out for ugly code practices)
- UI state management - keeping it simple but organised
- Keeping all React components independent
- How to read and load data from local files