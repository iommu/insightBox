import React from 'react'; 
import { useQuery } from 'urql';
import moment from "moment";

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 56 days returned from graphql
d.setDate(d.getDate()-5); // ie: minus 57 days from today's date
var start = new Date(d).toISOString();

function getRepetition(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

export const Graph9 = (dates) => {
    var start = moment(dates.sDate).subtract(1,"day").toISOString();  //subtract one day to match the sidebar
    const [result] = useQuery({
      query: `
      query {
        data(start:"` + start + `", end:"` + dates.eDate + `") {
       
          emails{id,poi_email},
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
    var rlen = result.data.data.length;
    console.log(result.data.data[0]);
    console.log(result.data.data[0].emails.length);

    for(var i = 0; i < result.data.data.length; i++)
    {
        for(var j = 0; j < result.data.data[i].emails.length; j++)
        {

            
        }
    }

    /*
    for (var i = 0; i < rlen; i++) {
        var received = result.data.data[i].received;
        total += received;
      }





    var total = 0;
    var avg_day, avg_week, avg_month;
    for (var i = 0; i < rlen; i++) {
      var received = result.data.data[i].received;
      total += received;
    }
    avg_day = total/56.0;
    avg_week = total/8.0;
    avg_month = total/2.0;

    if(!Number.isInteger(avg_day)){
        avg_day = avg_day.toFixed(2);
    }

    if(!Number.isInteger(avg_week)){
        avg_week = avg_week.toFixed(2);
    }

    if(!Number.isInteger(avg_month)){
      avg_month = avg_month.toFixed(2);
  }
*/
  return (
    <div id="graph9">
    
    </div>
);
  }