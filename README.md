React flashcard app allowing you to load a deck of questions and test your knowledge, similar to Quizlet and Anki. 

# How to use
Make sure you have latest versions of Node.js (v12.18 or higher), npm (v6.14 or higher) and Create React App.
1. Run ```npm install``` in the app directory to install all necessary packages.
2. Run ```npm start``` to run the app
3. Visit http://localhost:8081/ in browser and enjoy :)

# Loading question decks
A deck is written and represented as a JSON file, which can be then be imported into the app on launch. Decks must follow a specific schema to be read correctly - the following example is a deck containing one question, in the correct structure:

```json
[
    {
        "question": "What is the name of the little dragon in the animated movie Mulan?",
        "answer": "mushu"
    }
]
```

*Note - check your deck is written as an array, else you will encounter errors being thrown!*

# What I've learnt
This project has allowed me to practice some more with:
- Conceiving and writing *good* unit tests (by watching out for ugly code practices)
- UI state management - keeping it simple but organised
- Keeping all React components independent
- How to read and load data from local files
- Copying by reference in native Javscript - and difference between shallow and deep cloning for arrays.

The app has room for further possible improvements, such as functionality to create and edit decks within the app instead of relying on external json files.
