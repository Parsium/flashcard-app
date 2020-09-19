import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import AppPracticing from '../components/AppPracticing';

describe("AppPracticing", () => {
    test("skipping card keeps it in the deck", () => {
        const deck = [
            {id: 0, question: "question 1", answer: ""},
            {id: 1, question: "question 2", answer: ""}
        ];
        render(<AppPracticing deck={deck}></AppPracticing>);
        const card = screen.queryByText(deck[0].question);
        const skipButton = screen.queryByText("Skip card");
        
        userEvent.click(skipButton);
        userEvent.click(skipButton);
        expect(card.textContent).toBe("question 1");
    });

    test("answering card correctly removes it from the deck", () => {
        const deck = [
            {id: 0, question: "question 1", answer: "answer 1"},
            {id: 1, question: "question 2", answer: "answer 2"}
        ];
        const userAnswer = "answer 1";
        render(<AppPracticing deck={deck}></AppPracticing>);
        const card = screen.queryByText(deck[0].question);

        userEvent.type(screen.queryByRole("answer-box"), userAnswer);
        userEvent.click(screen.getByText("Confirm"));
        userEvent.click(screen.queryByText("Next card"));
        userEvent.click(screen.queryByText("Skip card"));
        expect(card.textContent).toBe("question 2");        
    });

    test("clicking on card correctly toggles between displaying question and answer", () => {
        const deck = [
            {id: 0, question: "question", answer: "answer"}
        ];
        render(<AppPracticing deck={deck}/>);
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
        render(<AppPracticing deck={deck}/>);

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
        render(<AppPracticing deck={deck}/>);

        userEvent.type(screen.queryByRole("answer-box"), userAnswer);
        userEvent.click(screen.getByText("Confirm"));
        const card = screen.queryByRole("card");
        expect(card.textContent).toBe("Incorrect");
    });
});