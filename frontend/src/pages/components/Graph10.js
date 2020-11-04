import React from "react";
import { useQuery } from "urql";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
d.setDate(d.getDate() - 8); // ie: minus 8 days from today's date
var start = new Date(d).toISOString();

export const Graph10 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            start +
            `", end:"` +
            end +
            `") {
          received_0,
          received_1,
          received_2,
          received_3,
          received_4,
          received_5,
          received_6,
          received_7,
          received_8,
          received_9,
          received_10,
          received_11,
          received_12,
          received_13,
          received_14,
          received_15,
          received_16,
          received_17,
          received_18,
          received_19,
          received_20,
          received_21,
          received_22,
          received_23,
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }
    console.log(result);

    var hoursData = [];
    var hours = [
        "Midnight",
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
        "11pm",
    ];

    var test = [];
    for (var i = 0; i < result.data.data.length; i++) {
        console.log(result.data.data[i]);

        //console.log(result.data.data[i].join());
        for (var j = 0; j < 24; j++) {
            //var r = "received_".concat(j.toString())
            //console.log(result.data.data[i].received_j);
        }
    }

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    // order matters here, array is oldest day first
    for (var i = 0; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var value = { name: days[day], Total: received, pv: 2400, amt: 2400 };
        graphdata.push(value);
    }

    return <div></div>;
    /*
    return (
        <div>
        <div className="graph-title">Emails Received per Day</div>
        <BarChart
        width={400} 
        height={165}
        data={graphdata}
        margin={{top: 5, right: 20, left: -20, bottom: 5,}}
          >
          <XAxis dataKey="name" stroke="#47494d" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
        </BarChart>
        </div>
    );
    */
};
