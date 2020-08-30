import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from '../components/app';
import CardPreview from '../components/CardPreview';

const TEST_DECK = [
    {id: 0, question: "What colour are the four stars on the flag of New Zealand?", answer:"red"},
    {id: 1, question: "How many states make up the United States of America?", answer:"50"},
    {id: 2, question: "By what name is the TV adventurer Edward Michael Grylls more commonly known?", answer: "bear grylls"},
    {id: 3, question: "From which language is the word ‘ketchup’ derived?", answer:"chinese"}
  ]; 

describe("App", () => {
    test("clicking on card correctly toggles between displaying question and answer", () => {
        const deck = [
            {id: 0, question: "question", answer: "answer"}
        ];
        render(<App deck={deck}/>);
        const card = screen.queryByText(deck[0].question);
        
        expect(card.textContent).toBe("question");
        userEvent.click(card);
        expect(card.textContent).toBe("answer");
        userEvent.click(card);
        expect(card.textContent).toBe("question");
    });

    test("correctly renders card when correct answer given", () => {
        const deck = [
            {id: 0, question: "question", answer: "answer"}
        ];
        const userAnswer = "answer";
        render(<App deck={deck}/>);

        userEvent.type(screen.queryByRole("answer-box"), userAnswer);
        userEvent.click(screen.getByText("Confirm"));
        const card = screen.queryByRole("card");
        expect(card.textContent).toBe("Correct");
    });

    test("correctly renders card when incorrect answer given", () => {
        const deck = [
            {id: 0, question: "question", answer: "answer"}
        ];
        const userAnswer = "green";
        render(<App deck={deck}/>);

        userEvent.type(screen.queryByRole("answer-box"), userAnswer);
        userEvent.click(screen.getByText("Confirm"));
        const card = screen.queryByRole("card");
        expect(card.textContent).toBe("Incorrect");
    });
});