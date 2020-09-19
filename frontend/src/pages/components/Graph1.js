import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, Tooltip
} from 'recharts';

const data = [
  { name: 'Monday', value: 400 },
  { name: 'Tuesday', value: 300 },
  { name: 'Wednesday', value: 300 },
  { name: 'Thursday', value: 200 },
  { name: 'Friday', value: 100 },
  { name: 'Saturday', value: 200 },
  { name: 'Sunday', value: 50 },
];

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

function Graph1() {
    return (
        <div>
        <div className="graph-title">Email % Day of the Week</div>
        <PieChart width={300} height={210}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }}/>
      </PieChart>
      </div>
    )
  }

export default Graph1;