
import React from 'react'; 
import { useQuery } from 'urql';
// eslint-disable-next-line
import { PureComponent } from 'react';
// eslint-disable-next-line
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';


export const Graph1 = () => {
  const COLORS = ['#3461d1', '#40a1f1', '#65AD50', '#FFD151', '#FF8042', '#f13333', '#9636ff'];

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
    const [result] = useQuery({
      query: `
      query {
        data(start:"2006-01-02T15:04:05Z", end:"2026-01-02T15:04:05Z") {
          date,
          received
        }
      }`
    });

    console.log(result);
  
    const { fetching, error } = result;
  
    if (fetching) return (
      <p> Loading user data </p>
    );
  
    if (error) {
      return (
        <p> Error getting user data </p>
      );
    };
  
    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (var i = rlen-7; i < rlen; i++) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var value = {name: days[day], value: received};
      graphdata.push(value);
      console.log(i);
    }
    return (
      <div>
      <div className="graph-title">Email % Day of the Week</div>
      <PieChart width={250} height={210}>
      <Pie
        data={graphdata}
        cx={120}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={90}
        fill="#8884d8"
        dataKey="value"
      >
        {
          graphdata.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }}/>
    </PieChart>
    </div>
    );
  }