import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import FileLoader from '../components/fileloader';

describe("FileLoader", () => {
    test("Rejects json file if not an array", () => {
        const file = new File([""], "test.json", {type: "application/json"});
        render(<FileLoader/>);

        const input = screen.queryByLabelText("Select a JSON file to upload:");
        userEvent.upload(input, file);
        const messageAlert = screen.getByTestId("fileloader-message-alert");
        expect(messageAlert.textContent).toBe("ERROR - JSON data is not in the correct format");
    });
});

// TESTS TO COMPLETE
// file successfully loads json file
// throws error if not json

// accepts json file correctly formatted
// reject json deck containing one erroneous question
// reject json deck if not an array
// reject empty deck
// reject deck not containing an object