
import React from 'react'; 
import { useQuery } from 'urql';
import moment from "moment";
// eslint-disable-next-line
import { PureComponent } from 'react';
// eslint-disable-next-line
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
//import Dashboard, { sDate } from '../Dashboard';
//alert('test: ' + Dashboard.updateDates);
//alert(sDatetoISOString());

//import SideBar from "./SideBar";
//import {Days} from './SideBar'
//alert(Days.day);

//import {startDate} from '../Dashboard'
//alert(startDate);

var sDates;
var eDates;

export const GraphTest2 = (dates) => {

  sDates = dates.sDate;
  eDates = dates.eDate;
  

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

  var start = moment(dates.sDate).subtract(1,"day").toISOString();
  const [result] = useQuery({
    query: `
    query {
      data(start:"` + start + `", end:"` + eDates + `") {
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
  console.log(result)
  var graphdata = [];
  var rlen = result.data.data.length;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // order doesnt matter here
  for (var i = 0; i < rlen; i++) {
    var date = new Date(result.data.data[i].date);
    var day = date.getDay(date);
    var received = result.data.data[i].received;
    var value = {name: days[day], value: received};
    console.log(value.name)
    if(graphdata.length == 0)
    {
      graphdata.push(value);
    }
    var match = false;
    for(var j = 0; j < graphdata.length; j++)
    {
      if(graphdata[j].name === value.name)
      {
        match = true;
        graphdata[j].value = graphdata[j].value + value.value;
      }
    }
    if(match !== true) {graphdata.push(value); }

  }

  console.log(graphdata);
  return (
    <div>
    <div className="graph-title">Email Received %<br /> Day of the Week (Range)</div>
    
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