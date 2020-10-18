import React from 'react'; 
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const graphdata = [
    
    {name: "Monday", Total: 23},
    {name: "Tuesday", Total: 26},
    {name: "Wednesday", Total: 24},
    {name: "Thursday", Total: 47},
    {name: "Friday", Total: 33},
    {name: "Sunday", Total: 11},
    {name: "Sunday", Total: 10},

]

export const Graph7Home = () => {
    

    var graphdata1 = [];
    var weeks = ["7 days (current)", "7 days (previous)" ];
    var total1 = 0;
    var total2 = 146;

    for (var i=0; i<7; i++){
        total1 += graphdata[i].Total;
    }

    var value1 = {Weeks: weeks[0], Total: total1};
    var value2 = {Weeks: weeks[1], Total: total2};
    graphdata1.push(value2);
    graphdata1.push(value1);


    return (
        <div>
        <div className="graph-title">Weekly Trend (Received)</div>
            <LineChart
            width={280}
            height={160}
            data={graphdata1}
            margin={{
            top: 20, right: 30, left: 10, bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Weeks" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Total" stroke="#65AD50" activeDot={{ r: 10 }}/>
            </LineChart>
        </div>
    );
  }