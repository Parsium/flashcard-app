import React, { useState } from "react";
import CardPreview from "./CardPreview";

const DeckPreview = ({deck}) => {
    const STATUSES = {question: "question", answer: "answer"};

    const [cardIndex, setCardIndex] = useState(0);
    const [status, setStatus] = useState(STATUSES.question);

    // Correct modulo operator not native to js, function to fix this
    Number.prototype.mod = function(a) {
        return ((this % a) + a) % a;
    }

    function toggleAnswer() {
        if (status === STATUSES.question) {
            setStatus(STATUSES.answer);   
        } else {
            setStatus(STATUSES.question);
        }
    }

    function changeCardIndex(newIndex) {
        let i = newIndex.mod(deck.length);
        setCardIndex(i);
    }

    let toRender = () => {
        let card = deck[cardIndex];
        let message = card.question;
        let colour = "blue";

        if (status === STATUSES.answer) {
            message = card.answer;
            colour = "grey";
        }

        return (
            <div id="deck-preview">
                <span id="card-pagination">Question {card.id+1} out of {deck.length}</span>
                <CardPreview
                    message={message}
                    colour={colour}
                    showCursor={true}
                    onClick={ ()=>toggleAnswer() }
                ></CardPreview>
                <button onClick={ ()=>changeCardIndex(cardIndex - 1) }>Previous</button>
                <button onClick={ ()=>changeCardIndex(cardIndex + 1) }>Next</button>
            </div>
        );
    };

    return toRender();
};
export default DeckPreview;