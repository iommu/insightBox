import React from "react";

export const Graph6Home = () => {
    var avg_day = 11.3;
    var avg_week = 79.1;
    var avg_month = 316.4;

    return (
        <div id="graph3">
            <div className="graph-title">Sent</div>

            <div className="graph-title2">Average per Day</div>
            <div className="numbers">{avg_day}</div>

            <div className="graph-title2">Average per Week</div>
            <div className="numbers">{avg_week}</div>

            <div className="graph-title2">Average per Month</div>
            <div className="numbers">{avg_month}</div>
        </div>
    );
};
