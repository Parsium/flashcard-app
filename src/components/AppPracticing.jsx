import React, { useState } from "react";
import CardPreview from "./CardPreview";
import AnswerBox from "./AnswerBox";

const AppPracticing = ({deck}) => {
    const STATUSES = {
        question: "question",
        hint: "hint",
        correct: "correct",
        incorrect: "incorrect",
        finish: "finish"
    }; 

    const [queue, setQueue] = useState( setupDeck(deck) );
    const [status, setStatus] = useState(STATUSES.question);

    function setupDeck(deck) {
        return deck.map(card => {
            card.hintsTaken = 0;
            card.incorrectAnswers = 0;
            return card;
        });
    }

    function validateAnswer(text) {
        var userAnswer = String(JSON.stringify(text.toLowerCase()).slice(1,-1));
        var realAnswer = queue[0].answer;

        if (realAnswer === userAnswer) {
            setStatus(STATUSES.correct);
        } else {
            // increment incorrectAnswers property for card
            setQueue(prevState => {
                const updatedQueue = Object.assign([], prevState);
                const card = updatedQueue[0];
                card.incorrectAnswers = card.incorrectAnswers + 1;
                return updatedQueue;
            });
            setStatus(STATUSES.incorrect);
        }
    }

    function toggleHint() {
        switch(status) {
            case STATUSES.question: 
                setStatus(STATUSES.hint);
                break;
            case STATUSES.hint:
                setStatus(STATUSES.question);
                break;
            default:
                break;
        }
    }

    function skipCard() {
        let updatedQueue = Object.assign([], queue);
        let skipped = updatedQueue.shift();
        updatedQueue.push(skipped);
        setQueue(updatedQueue);
        setStatus(STATUSES.question);
    }

    function nextCard() {
        if (queue.length <= 1) {
            setQueue([]);
            setStatus(STATUSES.finish);
            return;
        }

        let updatedQueue = Object.assign([], queue);
        setQueue(updatedQueue.slice(1));
        setStatus(STATUSES.question);
    }

    let cardPreview = () => {
        if (status == STATUSES.finish) return;

        let card = queue[0];

        var message = card.question;
        var colour = "blue";
        var showCursor = true;
        switch (status) {
            case STATUSES.hint:
                message = card.answer;
                colour = "grey"
                break;
            case STATUSES.correct:
                message = "Correct"
                colour = "green"
                showCursor = false;
                break;
            case STATUSES.incorrect:
                message = "Incorrect";
                colour = "red"
                showCursor = false;
                break;
            default:
                break;
        }

        return (
            <CardPreview
                id={card.id}
                message={message}
                colour={colour}
                showCursor={showCursor}
                onClick={() => toggleHint()}
            ></CardPreview>
        );
    };

    let answerBox = () => {
        if (status == STATUSES.finish) return;
        if (status == STATUSES.correct) return;
        return (
            <AnswerBox
                onClick={(text) => {
                    validateAnswer(text);
                }}>
            </AnswerBox>
        );
    }

    let buttons = () => {
        if (status == STATUSES.finish) return;

        if (status == STATUSES.correct || status == STATUSES.incorrect) {
            return <button className="control-group" type="submit" onClick={() => nextCard()}>Next card</button>
        }
        return <button className="control-group" type="submit" onClick={() => skipCard()}>Skip card</button>
    };

    return (
        <>
            {cardPreview()}
            {answerBox()}
            {buttons()}
        </>
    );
};
export default AppPracticing;