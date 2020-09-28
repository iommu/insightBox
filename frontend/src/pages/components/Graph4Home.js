
import React from 'react'; 
// eslint-disable-next-line
import { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from 'recharts';


const graphdata = [
    
    {name: "Monday", Received: 23, fill: "#3461d1"},
    {name: "Tuesday", Received: 26, fill: "#9636ff"},
    {name: "Wednesday", Received: 24, fill: "#f13333"},
    {name: "Thursday", Received: 47, fill: "#FF8042"},
    {name: "Friday", Received: 33, fill: "#FFD151"},
    {name: "Sunday", Received: 11, fill: "#65AD50"},
    {name: "Sunday", Received: 10, fill: "#40a1f1"},

]

export const Graph4Home = () => {
    return (
        <div>
        <div className="graph-title">Emails Recieved<br />per Week Day</div>
        <ResponsiveContainer width={160} height={150}>
          <RadialBarChart width={200} height={160} innerRadius={8} outerRadius={80} barSize={7} data={graphdata}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="Received" />
            <Tooltip />
          </RadialBarChart>
          </ResponsiveContainer>
        </div>
    );
  }