import React from "react";
import { useQuery } from "urql";

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 56 days returned from graphql
d.setDate(d.getDate() - 57); // ie: minus 57 days from today's date
var start = new Date(d).toISOString();

export const Graph3 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            start +
            `", end:"` +
            end +
            `") {
          date,
          received
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var rlen = result.data.data.length;
    var total = 0;
    var avg_day, avg_week, avg_month;
    for (var i = 0; i < rlen; i++) {
        var received = result.data.data[i].received;
        total += received;
    }
    avg_day = total / 56.0;
    avg_week = total / 8.0;
    avg_month = total / 2.0;

    if (!Number.isInteger(avg_day)) {
        avg_day = avg_day.toFixed(2);
    }

    if (!Number.isInteger(avg_week)) {
        avg_week = avg_week.toFixed(2);
    }

    if (!Number.isInteger(avg_month)) {
        avg_month = avg_month.toFixed(2);
    }

    return (
        <div id="graph3">
            <div className="graph-title">Received</div>

            <div className="graph-title2">Average per Day</div>
            <div className="numbers">{avg_day}</div>

            <div className="graph-title2">Average per Week</div>
            <div className="numbers">{avg_week}</div>

            <div className="graph-title2">Average per Month</div>
            <div className="numbers">{avg_month}</div>
        </div>
    );
};
