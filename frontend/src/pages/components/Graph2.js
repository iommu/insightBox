import React from 'react'; 
import { useQuery } from 'urql';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,  } from 'recharts';

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
d.setDate(d.getDate()-8); // ie: minus 8 days from today's date
var start = new Date(d).toISOString();

export const Graph2 = () => {
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
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    // order matters here, array is oldest day first
    for (var i = 0; i < rlen; i++) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var value = {name: days[day], Total: received, pv: 2400, amt: 2400};
      graphdata.push(value);
    }
    return (
        <div>
        <div className="graph-title">Emails Received per Day</div>
        
        <BarChart
        width={400} 
        height={165}
        data={graphdata}
        margin={{top: 5, right: 20, left: -20, bottom: 5,}}
          >
          <XAxis dataKey="name" stroke="#47494d" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
        </BarChart>
        </div>
    );
  }