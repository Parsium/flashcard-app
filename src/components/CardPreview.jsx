import React from "react";

const CardPreview = ({id, message, status, onClick}) => {
    let styleClasses = status + " " + "noselect";
    return (
        <>
            <div className="pagination">{ id }</div>
            <div role="card" id="card" className={styleClasses} onClick={onClick}>
                { message }
            </div>
        </>
    );
};
export default CardPreview;