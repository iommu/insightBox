import React from "react";
import moment from "moment";
import { useQuery } from "urql";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function splitToChunks(a, size) {
    var arrays = [];
    while (a.length > 0) {
        arrays.push(a.splice(0, size));
    }
    return arrays;
}

export const GraphTest3 = (dates) => {
    var start = moment(dates.sDate).subtract(1,"day").toISOString();  //subtract one day to match the sidebar
    const [result] = useQuery({
        query:
            `
    query {
      data(start:"` +
            start +
            `", end:"` +
            dates.eDate +
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
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    console.log(result);
    // order doesnt matter here
    for (var i = 0; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var value = { name: days[day], Total: received, pv: 2400, amt: 2400, date:date };
        graphdata.push(value);
    }
    const splitArray = splitToChunks(graphdata, 7);
    console.log(splitArray);
    return (
        <div>
            <div className="graph-title">
                Email Received per week of selected
            </div>
            <div id="mutliContainer">
            {splitArray.map((arr) => (
                <div> 
                    Week
                <BarChart
                    width={800}
                    height={150}
                    data={arr}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                    <XAxis dataKey="name" stroke="#47494d" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
                </BarChart>
                </div>
            ))}
            </div>
        </div>
    );
};
