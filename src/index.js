import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';

const TEST_DECK = [
  {id: 0, question: "What colour are the four stars on the flag of New Zealand?", answer:"red"},
  {id: 1, question: "How many states make up the United States of America?", answer:"50"},
  {id: 2, question: "By what name is the TV adventurer Edward Michael Grylls more commonly known?", answer: "bear grylls"},
  {id: 3, question: "From which language is the word ‘ketchup’ derived?", answer:"chinese"}
]; 

ReactDOM.render(
  <React.StrictMode>
    <App deck={TEST_DECK}></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
