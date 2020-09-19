import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import FileLoader from '../components/fileloader';

// describe("FileLoader", () => {
//     test("Accepts an arbitrary json file", () => {
//         const file = new File([""], "", {name: "test", type: "text/json"});
//         render(<FileLoader/>);
//         const input = screen.queryByLabelText("Select a JSON file to upload:");
//         input.file = file;
//         expect();
//     });
// });

// TESTS TO COMPLETE
// file successfully loads json file
// throws error if not json