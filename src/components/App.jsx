import React, { useState } from "react";
import CardPreview from "./CardPreview";
import AnswerBox from "./AnswerBox";

const App = ({deck}) => {
    const STATUSES = {question: "question", hint: "hint", correct: "correct", incorrect: "incorrect"}; 

    const [state, setState] = useState({queue: deck, status: STATUSES.question});

    function validateAnswer(text) {
        var userAnswer = JSON.stringify(text.toLowerCase()).slice(1,-1);
        var realAnswer = state.queue[0].answer;

        if (realAnswer === String(userAnswer)) {
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
            default:
                break;
        }
    }

    function skipCard() {
        let copiedQueue = Object.assign([], state.queue);
        let skipped = copiedQueue.shift();
        copiedQueue.push(skipped);
        setState(
            {queue: copiedQueue, status: STATUSES.question}
        );
    }

    function nextCard() {
        let copiedQueue = Object.assign([], state.queue);
        setState(
            {queue: copiedQueue.slice(1), status: STATUSES.question}
        );
    }

    let cardPreview = () => {
        let card = state.queue[0];

        var message = card.question;
        switch (state.status) {
            case STATUSES.hint:
                message = card.answer;
                break;
            case STATUSES.correct:
                message = "Correct"
                break;
            case STATUSES.incorrect:
                message = "Incorrect";
                break;
            default:
                break;
        }

        return (
            <CardPreview
                id={card.id}
                message={message}
                status={state.status}
                onClick={() => toggleHint()}
            ></CardPreview>
        );
    };

    let buttons = () => {
        if (state.status == STATUSES.correct || state == STATUSES.incorrect) {
            return <button className="control-group" type="submit" onClick={() => nextCard()}>Next card</button>
        }
        return <button className="control-group" type="submit" onClick={() => skipCard()}>Skip card</button>
    };

    return (
        <div id="page-container">
            <h1>Deck</h1>
            {cardPreview()}
            <AnswerBox
                onClick={(text) => {
                    validateAnswer(text);
                }}>
            </AnswerBox>
            {buttons()}
        </div>
    );
};
export default App;