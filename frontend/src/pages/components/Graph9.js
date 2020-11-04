import React from 'react'; 
import { useQuery } from 'urql';

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 56 days returned from graphql
d.setDate(d.getDate()-30); // ie: minus 57 days from today's date
var start = new Date(d).toISOString();

function getRepetition(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

export const Graph9 = () => {
   // var start = moment(dates.sDate).subtract(1,"day").toISOString();  //subtract one day to match the sidebar
    const [result] = useQuery({
      query: `
      query {
        data(start:"` + start + `", end:"` + end + `") {
       
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

    //generates a simple aggregate list of received contacts
    var emailList = [];
    for(let i = 0; i < result.data.data.length; i++)
    {
        for(let j = 0; j < result.data.data[i].emails.length; j++)
        {
            emailList.push(result.data.data[i].emails[j].poi_email);
        }
    }
    console.log(emailList);


    //code to generate matches
    var matched = [];
    var matchedCount = [];
    for(let i = 0; i < emailList.length; i++)
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
    for(let i = 0; i < matched.length; i++)
    {
      final.push([matched[i],matchedCount[i]]);
      finalTest.set(matched[i],matchedCount[i]);
    }

    //console.log(final);
    //console.log(finalTest);
    //console.log([...finalTest.entries()].reduce((a, f ) => f[1] > a[1] ? f : a)); //logic to get most contacted
    const mostContact = [...finalTest.entries()].reduce((a, f ) => f[1] > a[1] ? f : a);
    console.log(mostContact);

    // add to insights
    localStorage.popularContact = mostContact[0];
    
  return (
    <div id="graph3">
     <div className="graph-title">Most Received (over 30 days)</div>
        
        <div className="graph-title2">Contact:</div>
        <div className="numbers">{mostContact[0]}</div>
        
        <div className="graph-title2">Received Emails</div>
        <div className="numbers">{mostContact[1]}</div>
    </div>
);
  }