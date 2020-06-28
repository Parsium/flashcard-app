import React, { useState } from "react";

const TEST_DECK = [
    {id: 0, question: "What colour are the four stars on the flag of New Zealand?", answer:"red"},
    {id: 1, question: "How many states make up the United States of America?", answer:"50"},
    {id: 2, question: "By what name is the TV adventurer Edward Michael Grylls more commonly known?", answer: "bear grylls"},
    {id: 3, question: "From which language is the word ‘ketchup’ derived?", answer:"chinese"}
]; 

const App = () => {
    const CardStates = {QUESTION: "question", ANSWER: "answer", CORRECT: "correct", INCORRECT: "incorrect"}; 
    const [card, setCard] = useState(TEST_DECK[0]);
    const [state, setState] = useState(CardStates.QUESTION);

    function validateAnswer(text) {
        var answer = JSON.stringify(text.toLowerCase()).slice(1,-1);

        console.log("True Answer: " + card.answer);
        console.log("User Answer: " + String(answer));
        if (card.answer == String(answer)) {
            console.log("Correct answer!");
            setState(CardStates.CORRECT);
        } else {
            console.log("Incorrect");
            setState(CardStates.INCORRECT);
        }
    }

    function toggleHint() {
        switch(state) {
            case CardStates.QUESTION: 
                setState(CardStates.ANSWER);
                break;
            case CardStates.ANSWER:
                setState(CardStates.QUESTION);
                break;
        }
    }

    return (
        <div id="page-container">
            <h1>Deck</h1>
            <CardPreview
                id={card.id}
                question={card.question}
                answer={card.answer}
                state={state}
                CardStates={CardStates}
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
                type="submit">
                    Skip card
            </button>
        </div>
    );
};

const CardPreview = ({id, question, answer, state, CardStates, onClick}) => {
    let cardClass = state + " " + "noselect";
    return (
        <>
            <div className="pagination">{ id }</div>
            <div id="card" className={cardClass} onClick={onClick}>{ state == CardStates.QUESTION ? question : answer}</div>
        </>
    );
};

const AnswerBox = (props)  => {
    const [text, setText] = useState("");
    
    return (
        <form className="control-group">
            <label htmlFor="answer">Type answer</label>
            <input 
                name="answer-text"
                value={text}
                onChange={e => setText(e.target.value)}
                type="text"
            ></input>
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    props.onClick(text);
                }}
            >Confirm</button>
        </form>
    );
};


export default App;