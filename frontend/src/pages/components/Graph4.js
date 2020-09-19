
import React from 'react'; 
import { useQuery } from 'urql';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

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
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    for (var i = rlen-7; i < rlen; i++) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var sent = result.data.data[i].sent;
      var value = {name: days[day], Received: received, Sent: sent, amt: 2400};
      graphdata.push(value);
      console.log(i);
    }
    return (
        <div>
        <div className="graph-title">Sent vs Received</div>
            <LineChart
            width={470}
            height={190}
            data={graphdata}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sent" stroke="#65AD50"  />
            <Line type="monotone" dataKey="Received" stroke="#40a1f1" activeDot={{ r: 8 }}/>
            </LineChart>
        </div>
    );
  }