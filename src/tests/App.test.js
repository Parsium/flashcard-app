import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from '../components/App';

describe("App", () => {
    test("App renders on loading DOM", () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});