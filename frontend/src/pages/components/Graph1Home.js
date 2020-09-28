
import React from 'react'; 
// eslint-disable-next-line
import { PureComponent } from 'react';
// eslint-disable-next-line
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const graphdata = [
    
    {name: "Monday", Total: 23},
    {name: "Tuesday", Total: 26},
    {name: "Wednesday", Total: 24},
    {name: "Thursday", Total: 47},
    {name: "Friday", Total: 33},
    {name: "Sunday", Total: 11},
    {name: "Sunday", Total: 10},

]

export const Graph1Home = () => {
  const COLORS = ['#40a1f1', '#65AD50', '#FFD151', '#FF8042', '#f13333', '#9636ff', '#3461d1'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
    <div className="graph-title">Email Received %<br /> Day of the Week</div>
    <ResponsiveContainer width={170} height={150}>
    <PieChart >
    <Pie
      data={graphdata}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius="100%"
      fill="#8884d8"
      dataKey="Total"
    >
      {
        graphdata.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
      }
    </Pie>
    <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }}/>
  </PieChart>
  </ResponsiveContainer>
  </div>
  );
 }