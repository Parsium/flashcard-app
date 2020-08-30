import React, { useState } from "react"; 

const AnswerBox = (props)  => {
    const [text, setText] = useState("");
    
    return (
        <form className="control-group">
            <label htmlFor="answer-box">Type answer</label>
            <input 
                role="answer-box"
                name="answer-box"
                value={text}
                onChange={e => setText(e.target.value)}
                type="text"
            ></input>
            <button
                role="submit-answer"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    props.onClick(text);
                }}
            >Confirm</button>
        </form>
    );
};
export default AnswerBox;