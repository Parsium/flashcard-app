import React, { useState } from "react";
import DeckPreview from "./DeckPreview";
import FileLoader from "./FileLoader";

const AppLanding = ({deck, beginPractice, setDeckData}) => { 
    let deckPreview = () => {
        if (deck !== undefined) {
            return (
                <>
                    <div id="deck-preview-wrapper">
                        <h1>Deck preview</h1>
                        <p>Use the preview to study before testing.</p>
                        <DeckPreview deck={deck}/>
                    </div>
                    <button className="large-button" onClick={() => beginPractice()}>READY</button>
                </>
            );
        }
    };

    return (
        <>
            <p>Test your knowledge by uploading your own flashcard deck below.</p>
            <p>A deck must be as an array in a JSON file.</p>
            <FileLoader
                setDeckData={setDeckData}
            />
            { deckPreview() }
        </>
    );
};
export default AppLanding;