import React from 'react'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const graphdata = [
    
    {name: "M", Total: 23, pv: 2400, amt: 2400},
    {name: "T", Total: 26, pv: 2400, amt: 2400},
    {name: "W", Total: 24, pv: 2400, amt: 2400},
    {name: "T", Total: 47, pv: 2400, amt: 2400},
    {name: "F", Total: 33, pv: 2400, amt: 2400},
    {name: "S", Total: 11, pv: 2400, amt: 2400},
    {name: "S", Total: 10, pv: 2400, amt: 2400},

]

export const Graph2Home = () => {
    return (
        <div>
        <div className="graph-title">Emails Received per Day</div>
        <ResponsiveContainer width={400} height={180}>
        <BarChart 
        data={graphdata}
        margin={{top: 5, right: 20, left: -20, bottom: 5,}}
          >
          <XAxis dataKey="name" stroke="#47494d" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
        </BarChart>
        </ResponsiveContainer>
        </div>
    );
  }