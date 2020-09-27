import React from 'react'; 
import { useQuery } from 'urql';
// eslint-disable-next-line
import { PureComponent } from 'react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,Tooltip} from 'recharts';

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
d.setDate(d.getDate()-8); // ie: minus 8 days from today's date
var start = new Date(d).toISOString();

export const Graph8 = () => {
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
        <div className="graph-title">Received per Week Day</div>
        <RadarChart cx={125} cy={110} outerRadius={80} width={260} height={210} data={graphdata}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{fontSize: 12}}/>
            <PolarRadiusAxis />
            <Radar name="Received per Week Day" dataKey="value" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
            <Tooltip />
        </RadarChart>
        </div>
    );
  }