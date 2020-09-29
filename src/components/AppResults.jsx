import React, { useState } from "react";

const AppResults = () => {
    return (
        <>
            <h1>Results</h1>
            <div>
                <h2>Overall</h2>
                <table id="results-table">
                    <tr>
                        <th>Easier</th>
                        <th>Difficult</th>
                        <th>Harder</th>
                    </tr>
                    <tr>
                        <td className="green tooltip">60%
                            <span className="tooltiptext">Cards answered correctly first time with no hints</span>
                        </td>
                        <td className="orange tooltip">30%
                            <span className="tooltiptext">Cards answered with a hint or incorrectly once</span>
                        </td>
                        <td className="red tooltip">10%
                            <span className="tooltiptext">Cards answered incorrectly more than once</span>
                        </td>
                    </tr>
                </table>
            </div>
            <button className="large-button">FINISH</button>
        </>
    );
};
export default AppResults;