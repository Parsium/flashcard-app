import React, { useState } from "react";

const FileLoader = ({setDeckData}) => {
    let reader;
    const [file, setFile] = useState(undefined);
    const [message, setMessage] = useState("");

    // Handler called once file has been successfully read
    const handleFileRead = (e) => {
        const content = JSON.parse(reader.result);
        console.log("Checking for errors...");

        // Check deck data is in an array
        if (!Array.isArray(content)) {
            setMessage("ERROR - File data is not in the correct format");
            return;
        } 

        // Check if all questions are objects with the necessary fields
        const checkQuestionProps = (errorFound, item) => {
            return (errorFound || (item.hasOwnProperty("id") && item.hasOwnProperty("question") && item.hasOwnProperty("answer"))); 
        };
        var error = !(true || content.reduce(checkQuestionProps, false));
        if (error) {
            setMessage("ERROR - Found a question has been incorrectly formatted. Correct and try again.");
            return;
        }
        
        console.log("File read successfully.");
        setDeckData(content);
    };

    // Handler to load in file to memory
    const handleFileChosen = (file) => {
        var type = /application\/json/;
        reader = new FileReader();

        if (file.type.match(type)) {
            console.log("Loading file...");
            reader.onloadend = handleFileRead;
            reader.readAsText(file);
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
                onChange={(e) => handleFileChosen(e.target.files[0])}    
            ></input>
        <p>{ message }</p>
        </form>
    );

    
};
export default FileLoader;