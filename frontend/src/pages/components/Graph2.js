import React from 'react'; 
import { useQuery } from 'urql';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Graph2 = () => {
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
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    for (var i = rlen-7; i < rlen; i++) {
      var date = new Date(result.data.data[i].date);
      var day = date.getDay(date);
      var received = result.data.data[i].received;
      var value = {name: days[day], Total: received, pv: 2400, amt: 2400};
      graphdata.push(value);
      console.log(i);
    }
    return (
        <div>
        <div className="graph-title">Emails per Day</div>
        <BarChart width={450} height={200} data={graphdata} px={500}>
          <XAxis dataKey="name" stroke="#47494d" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
        </BarChart>
        </div>
    );
  }