
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const graphdata = [
    
    {name: "M", Received: 23, Sent: 9, amt: 2400},
    {name: "T", Received: 26, Sent: 10, amt: 2400},
    {name: "W", Received: 24, Sent: 15, amt: 2400},
    {name: "T", Received: 47, Sent: 24, amt: 2400},
    {name: "F", Received: 33, Sent: 13, amt: 2400},
    {name: "S", Received: 11, Sent: 2, amt: 2400},
    {name: "S", Received: 10, Sent: 3, amt: 2400},

]

export const Graph5Home = () => {

    return (
        <div>
        <div className="graph-title">Sent vs Received</div>
            <LineChart
            width={410}
            height={160}
            data={graphdata}
            margin={{
            top: 20, right: 20, left: -30, bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Received" stroke="#40a1f1" activeDot={{ r: 8 }}/>
            <Line type="monotone" dataKey="Sent" stroke="#65AD50"  />
            </LineChart>
        </div>
    );
  }