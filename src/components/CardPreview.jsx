import React from "react";

const CardPreview = ({message, colour, showCursor, onClick}) => {
    let cursorClass = showCursor ? "show-cursor" : "hide-cursor";
    let styleClasses = colour + " " + cursorClass + " " + "noselect";
    return (
        <div id="card-preview-wrapper">
            <div role="card" id="card" className={styleClasses} onClick={onClick}>
                { message }
            </div>
        </div>
    );
};
export default CardPreview;