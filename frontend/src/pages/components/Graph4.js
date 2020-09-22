
import React from 'react'; 
import { useQuery } from 'urql';
// eslint-disable-next-line
import { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Tooltip } from 'recharts';


export const Graph4 = () => {
    const [result] = useQuery({
      query: `
      query {
        data(start:"2006-01-02T15:04:05Z", end:"2026-01-02T15:04:05Z") {
          date,
          received,
          sent
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
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
    var colours = ["#40a1f1", "#65AD50", "#FFD151", "#FF8042", "#f13333", "#9636ff", "#3461d1"];
    var counter = 0;
    for (var i = rlen-7; i < rlen; i++) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var value = {name: days[day], Received: received, fill: colours[6-counter++]};
      graphdata.push(value);
    }

    return (
        <div>
        <div className="graph-title">Emails per Week Day</div>
          <RadialBarChart width={240} height={210} cx={120} cy={100} innerRadius={10} outerRadius={100} barSize={8} data={graphdata}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="Received" />
            <Tooltip />
          </RadialBarChart>
        </div>
    );
  }