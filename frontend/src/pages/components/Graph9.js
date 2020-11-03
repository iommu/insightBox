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
    //console.log(result.data.data);
    //console.log(result.data.data[0].emails.length);


    //generates a simple aggregate list of received contacts
    var emailList = [];
    for(var i = 0; i < result.data.data.length; i++)
    {
        for(var j = 0; j < result.data.data[i].emails.length; j++)
        {
            emailList.push(result.data.data[i].emails[j].poi_email);
        }
    }
    console.log(emailList);


    //code to generate matches
    var matched = [];
    var matchedCount = [];
    for(var i = 0; i < emailList.length; i++)
    {
        console.log(getRepetition(emailList, emailList[i]));
        
        if(matched.length === 0)
        {
            matched.push(emailList[i]);
            matchedCount.push(getRepetition(emailList, emailList[i]));
        }
        else  if (matched.includes(emailList[i]) === false)
        {
          matched.push(emailList[i]);
          matchedCount.push(getRepetition(emailList, emailList[i]));
        }
    }

    console.log(matched)
    console.log(matchedCount)
    
    var final = [];
    let finalTest = new Map();
    for(var i = 0; i < matched.length; i++)
    {
      final.push([matched[i],matchedCount[i]]);
      finalTest.set(matched[i],matchedCount[i]);
    }

    //console.log(final);
    //console.log(finalTest);
  return (
    <div id="graph9">
    
    </div>
);
  }