import React from 'react'; 
import { useQuery } from 'urql';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export const Graph6 = () => {
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

    var graphdata = [];
    var weeks = ["Week 1", "Week 2" ];
    var rlen = result.data.data.length;
    var weekCount = Math.floor(rlen/7);
    var total = 0;
    for(var i = 0; i < weekCount; i++)
    {
        for(var j = i*7; j < (i*7) + 7; j++)
        {
            var received = result.data.data[j].received;
            total += received;
        }
        console.log(total);
        var avg = total;
        var value = {Weeks: weeks[i], Average: avg};
        total = 0;
        graphdata.push(value);
    }

    return (
        <div>
        <div className="graph-title">Weekly Trend Average</div>
            <LineChart
            width={450}
            height={190}
            data={graphdata}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Weeks" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Average" stroke="#65AD50" activeDot={{ r: 10 }}/>
            </LineChart>
        </div>
    );
  }