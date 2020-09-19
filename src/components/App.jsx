import React, { useState } from "react";
import AppPracticing from "./AppPracticing";
import AppLanding from "./AppLanding";
import AppResults from "./AppResults";

const App = () => {
    const STATES = {
        landing: "landing",
        practicing: "practicing",
        results: "results"
    };
    const [state, setState] = useState(STATES.landing);
    const [deckData, setDeckData] = useState(undefined);

    function beginPractice() {
        if (deckData !== undefined) {
            setState(STATES.practicing);
        }
    } 

    let toRender = () => {
        switch (state) {
            case STATES.landing:
                return (
                    <AppLanding 
                        deck={deckData} 
                        beginPractice={() => beginPractice()}
                        setDeckData={(data) => setDeckData(data)}
                    ></AppLanding>
                );
            case STATES.practicing:
                return <AppPracticing deck={deckData}></AppPracticing>;
            case STATES.results:
                return <AppResults></AppResults>;
            default:
                throw "App is in an illegal state!";
        }
    };
    return (
        <div id="app">
            <div id="header">Flashcards</div>
            {toRender()}
        </div>
    );
};
export default App;
