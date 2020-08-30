import React, { useState } from "react";
import CardPreview from "./CardPreview";
import AnswerBox from "./AnswerBox";

const App = ({deck}) => {
    const STATUSES = {question: "question", hint: "hint", correct: "correct", incorrect: "incorrect"}; 

    const [state, setState] = useState({...deck[0], status: STATUSES.question});

    function validateAnswer(text) {
        var answer = JSON.stringify(text.toLowerCase()).slice(1,-1);

        if (state.answer == String(answer)) {
            setState(prevState => { return {...prevState, status: STATUSES.correct} });
        } else {
            setState(prevState => { return {...prevState, status: STATUSES.incorrect} });
        }
    }

    function toggleHint() {
        switch(state.status) {
            case STATUSES.question: 
                setState(prevState => { return {...prevState, status: STATUSES.hint} });
                break;
            case STATUSES.hint:
                setState(prevState => { return {...prevState, status: STATUSES.question} });
                break;
        }
    }

    function skipCard() {
        return;
    }

    function nextCard() {
        return;
    }

    var message = state.question;
    switch (state.status) {
        case STATUSES.hint:
            message = state.answer;
            break;
        case STATUSES.correct:
            message = "Correct"
            break;
        case STATUSES.incorrect:
            message = "Incorrect";
            break;
    }

    return (
        <div id="page-container">
            <h1>Deck</h1>
            <CardPreview
                id={state.id}
                message={ message }
                status={state.status}
                onClick={() => toggleHint()}
            >
            </CardPreview>
            <AnswerBox
                onClick={(text) => {
                    validateAnswer(text);
                }}>
            </AnswerBox>
            <button
                className="control-group"
                type="submit"
                onClick={() => {}}>
                    Next
            </button>
        </div>
    );
};
export default App;