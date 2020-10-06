import React, { useState } from "react";
import CardPreview from "./CardPreview";
import AnswerBox from "./AnswerBox";
import sleep from "../sleep.js";

const AppPracticing = ({deck, finishPractice}) => {
    const STATUSES = {
        question: "question",
        hint: "hint",
        correct: "correct",
        incorrect: "incorrect",
    }; 

    const [queue, setQueue] = useState( setupDeck(deck) );
    const [status, setStatus] = useState(STATUSES.question);
    const [results, setResults] = useState([]);

    function setupDeck(data) {
        const updatedDeck = JSON.parse(JSON.stringify(data)) // deep clone the deck since its array of objects, to prevent accidentially updating the parent's copy

        return updatedDeck.map(card => {
            card.incorrectAnswers = 0;
            card.hintsTaken = 0;
            return card;
        });
    }

    async function validateAnswer(text) {
        var userAnswer = String(JSON.stringify(text.toLowerCase()).slice(1,-1));
        var realAnswer = queue[0].answer;

        if (realAnswer === userAnswer) {
            setStatus(STATUSES.correct);
        } else {
            // increment incorrectAnswers for card
            setQueue(oldQueue => { // Updates on rendering once status changes to `incorrect`
                const newQueue = [...oldQueue];
                var v = newQueue[0].incorrectAnswers + 1;
                newQueue[0] = {...newQueue[0], incorrectAnswers: v};
                return newQueue;
            });
            setStatus(STATUSES.incorrect);
            await sleep(2000);
            setStatus(STATUSES.question);
        }
    }

    function toggleHint() {
        if (status === STATUSES.question) {
            // increment hintsTaken for card
            setQueue(oldQueue => {
                const newQueue = [...oldQueue];
                var v = newQueue[0].hintsTaken + 1;
                newQueue[0] =  {...newQueue[0], hintsTaken: v};
                return newQueue;
            });
            setStatus(STATUSES.hint);
        } else if (status === STATUSES.hint) {
            setStatus(STATUSES.question);
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
        // If all cards are answered, pass results to parent
        if (queue.length <= 1) {
            finishPractice(results);
        }

        let updatedResults = Object.assign([...results, queue[0]], results);
        let updatedQueue = Object.assign([], queue);
        setQueue(updatedQueue.slice(1));
        setResults(updatedResults);
        setStatus(STATUSES.question);
    }

    let cardPreview = () => {
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