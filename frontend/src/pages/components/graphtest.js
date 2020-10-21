
import React from 'react'; 
import { useQuery } from 'urql';
// eslint-disable-next-line
import { PureComponent } from 'react';
// eslint-disable-next-line
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Dashboard, { sDate } from '../Dashboard';
//alert('test: ' + Dashboard.updateDates);
//alert(sDatetoISOString());

//import SideBar from "./SideBar";
//import {Days} from './SideBar'
//alert(Days.day);

//import {startDate} from '../Dashboard'
//alert(startDate);

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
d.setDate(d.getDate()-8); // ie: minus 8 days from today's date
var start = new Date(d).toISOString();

export const Graphtest = (props) => {
  
  //var test = props.hell;
  
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

  //alert(days.startDate)

  const [result] = useQuery({
    query: `
    query {
      data(start:"` + start + `", end:"` + end + `") {
        date,
        received
      }
    }`
  });
  
  const { fetching, error } = result;
  
  if (fetching) return (
    <p> Loading user data </p>
  );
  
  if (error) {
    return (
      <p> Error getting user data </p>
    );
  };

  //console.log(Dashboard.state.startDate.toISOString())

  
  // do computation here
  var graphdata = [];
  var rlen = result.data.data.length;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // order doesnt matter here
  for (var i = 0; i < rlen; i++) {
    var date = new Date(result.data.data[i].date);
    var day = date.getDay(date);
    var received = result.data.data[i].received;
    var value = {name: days[day], value: received};
    graphdata.push(value);
  }
  return (
    <div>
    <div className="graph-title">Email Received %<br /> Day of the Week</div>
    
    <PieChart width={170} height={150}>
    <Pie
      data={graphdata}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius="100%"
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