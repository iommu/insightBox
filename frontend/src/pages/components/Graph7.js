import React from "react";
import { useQuery } from "urql";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 14 days returned from graphql
d.setDate(d.getDate() - 15); // ie: minus 15 days from today's date
var start = new Date(d).toISOString();

export const Graph7 = () => {
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

    var graphdata = [];
    var weeks = ["7 days (previous)", "7 days (current)"];
    var total1 = 0;
    var total2 = 0;

    for (var i = 0; i < 14; i++) {
        if (i < 7) {
            // week 1
            total1 += result.data.data[i].received;
        } else {
            // week 2
            total2 += result.data.data[i].received;
        }
    }

    var value1 = { Weeks: weeks[0], Total: total1 };
    var value2 = { Weeks: weeks[1], Total: total2 };
    graphdata.push(value1);
    graphdata.push(value2);

    return (
        <div>
            <div className="graph-title">Weekly Trend (Received)</div>
            <LineChart
                width={280}
                height={160}
                data={graphdata}
                margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Weeks" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Total"
                    stroke="#65AD50"
                    activeDot={{ r: 10 }}
                />
            </LineChart>
        </div>
    );
};
