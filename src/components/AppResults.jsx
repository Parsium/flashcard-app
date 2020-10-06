import React from "react";

const AppResults = ({results, resetApp}) => {
    var greenPercent = 0.0;
    var orangePercent = 0.0;
    var redPercent = 0.0;
    var p = 1.0/results.length;

    results.forEach(card => {
        if (card.incorrectAnswers == 0 && card.hintsTaken == 0) {
            greenPercent += p;
        } else if (card.incorrectAnswers == 1 || card.hintsTaken == 1) {
            orangePercent += p;
        } else {
            redPercent += p;
        }
    });

    return (
        <>
            <h1>Results</h1>
            <div>
                <table id="results-table">
                    <tr>
                        <th>Easy</th>
                        <th>Difficult</th>
                        <th>Hard</th>
                    </tr>
                    <tr>
                        <td className="green tooltip">
                            <div class="result">{ greenPercent * 100 }%</div>
                            <span className="tooltiptext">Cards answered correctly first time with no hints</span>
                        </td>
                        <td className="orange tooltip">
                            <div class="result">{ orangePercent * 100 }%</div>
                            <span className="tooltiptext">Cards answered with a hint or incorrectly once</span>
                        </td>
                        <td className="red tooltip">
                            <div class="result">{ redPercent * 100 }%</div>
                            <span className="tooltiptext">Cards answered with a hint or incorrectly more than once</span>
                        </td>
                    </tr>
                </table>
            </div>
            <button className="large-button" onClick={ () => resetApp() }>FINISH</button>
        </>
    );
};
export default AppResults;