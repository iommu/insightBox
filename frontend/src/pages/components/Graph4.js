
import React from 'react'; 
import { useQuery } from 'urql';
// eslint-disable-next-line
import { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from 'recharts';

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
d.setDate(d.getDate()-8); // ie: minus 8 days from today's date
var start = new Date(d).toISOString();

export const Graph4 = () => {
    const [result] = useQuery({
      query: `
      query {
        data(start:"` + start + `", end:"` + end + `") {
          date,
          received,
          sent
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
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
    var colours = ["#40a1f1", "#65AD50", "#FFD151", "#FF8042", "#f13333", "#9636ff", "#3461d1"];
    var counter = 0;
    for (var i = rlen-1; i > -1; i--) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var value = {name: days[day], Received: received, fill: colours[6-counter++]};
      graphdata.push(value);
    }

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