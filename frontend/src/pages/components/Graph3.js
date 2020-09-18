import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import getDays from './Queries';

console.log("here");

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 500, pv: 3400, amt: 3000}, {name: 'Page C', uv: 600, pv: 4000, amt: 4000}];

var result = 3;

function Graph3() {

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    for (var i = rlen-7; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var value = {name: days[day], Total: received, pv: 2400, amt: 2400};
        graphdata.push(value);
        console.log(i);
    }

    return (
        <div>
        <div className="graph-title">Emails per Day</div>
        <BarChart width={450} height={200} data={graphdata}>
            <XAxis dataKey="name" stroke="#47494d" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
        </BarChart>
        </div>
    )
  }

export default Graph3;