import React from 'react'; 
import { useQuery } from 'urql';

export const Graph3 = () => {
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
    var rlen = result.data.data.length;
    var total = 0;
    var avg_day, avg_week;
    for (var i = 0; i < rlen; i++) {
      var received = result.data.data[i].received;
      total += received;
    }
    avg_day = total/14.0;
    avg_week = total/2.0;
    return (
        <div id="graph3">
        <br/>
        <div className="graph-title">Total over 2 Weeks</div>
            {total}
        <br/>
        <br/>
        <div className="graph-title">Average per Day</div>
            {avg_day}
        <br/>
        <div className="graph-title">Average per Week</div>
            {avg_week}
        <br/>
        </div>
    );
  }