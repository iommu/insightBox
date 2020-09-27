
import React from 'react'; 
import { useQuery } from 'urql';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
d.setDate(d.getDate()-8); // ie: minus 8 days from today's date
var start = new Date(d).toISOString();

export const Graph5 = () => {
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

    console.log(result);
  
    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    for (var i = 0; i < rlen; i++) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var sent = result.data.data[i].sent;
      var value = {name: days[day], Received: received, Sent: sent, amt: 2400};
      graphdata.push(value);
    }
    return (
        <div>
        <div className="graph-title">Sent vs Received</div>
            <LineChart
            width={410}
            height={190}
            data={graphdata}
            margin={{
            top: 20, right: 20, left: -30, bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Received" stroke="#40a1f1" activeDot={{ r: 8 }}/>
            <Line type="monotone" dataKey="Sent" stroke="#65AD50"  />
            </LineChart>
        </div>
    );
  }