import React, { useState } from "react";

const FileLoader = ({setDeckData}) => {
    let reader;
    const [message, setMessage] = useState("");

    /* Handler called once file has been successfully read */
    const handleFileRead = (e) => {
        const content = JSON.parse(reader.result);
        console.log("Checking for errors...");

        // Check deck data is in an array and non-empty
        if (!Array.isArray(content) || (Object.keys(content).length == 0)) {
            setMessage("ERROR - JSON data is not in the correct format");
            return;
        } 

        // Check if all items are objects with the necessary `question` and `answer` fields
        const checkItemProps = (content) => content.find(item => {
            return !(item.hasOwnProperty("question") && item.hasOwnProperty("answer"));
        });
        if (checkItemProps(content) != undefined) {
            setMessage("ERROR - Please ensure all questions have a `question` and `item` field and try again.");
            return;
        }
        
        // Set answers to all lowercase
        content.forEach(item => {
            item.answer = String(JSON.stringify(item.answer.toLowerCase()).slice(1,-1));
        });
        
        setDeckData(content);
    };

    /* Handler to load in file to memory */
    const handleFileChosen = (file) => {
        var type = /application\/json/;
        reader = new FileReader();

        if (file.type.match(type)) {
            console.log("Loading file...");
            reader.onloadend = handleFileRead;
            reader.readAsText(file);
            setMessage("");
        } else {
            setMessage("ERROR - File type not supported");
        }
    };

    return (
        <form>
            <label htmlFor="file">Select a JSON file to upload:</label>
            <input
                type="file"
                id="file"
                name="file"
                accept="application/json"
                onChange={(e) => handleFileChosen(e.target.files[0])}    
            ></input>
        <p data-testid="fileloader-message-alert">{ message }</p>
        </form>
    );

    
};
export default FileLoader;