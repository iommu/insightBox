import React from 'react'; 
// import graphql and create client
import { useQuery } from 'urql';
import down from '../../images/down.png';


import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';



function LogOutFunc(that) {
  localStorage.removeItem("token");
  that.props.history.push("/");
}

// create queries
export const User = () => {
  const [result, getUsers] = useQuery({
    query: `
    query {
      user {
        id
      }
    }`
  });

  const { data, fetching, error } = result;

  if (fetching) return (
    <p> Loading user data </p>
  );

  if (error) {
    return (
      <p> Error getting user data </p>
    );
  };

  return (
    <p> Welcome {data.user.id}</p>
  );
}

export const Day = () => {
  const [result, getDayData] = useQuery({
    query: `
    query {
      data(start:"2006-01-02T15:04:05Z", end:"2026-01-02T15:04:05Z") {
        date,
        received
      }
    }`
  });

  console.log(result);

  const { data, fetching, error } = result;

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

export const ID = () => {
  const [result, getDayData] = useQuery({
    query: `
    query {
      user {
        given_name,
        family_name,
        picture  
      }
    }`
  });

  console.log(result);

  const { data, fetching, error } = result;

  if (fetching) return (
    <p> Loading user data </p>
  );

  if (error) {
    return (
      <p> Error getting user data </p>
    );
  };

  return ( 

  <div className="dropdown">
            <button className="dropbtn">
                <div>
                    <img id="down-img" alt="dropdown arrow" src={down} width="25"/>
                </div>
                
                <div id="text-profile">
                    Hello, {data.user.given_name}
                </div>
                <div>
                    <img id="profile-img" alt="user profile pic" src={data.user.picture} width="30"/>
                </div>
            </button>
            <div className="dropdown-content">
                <a href="/dashboard">Settings</a>
                <a href="/" onClick={() => { LogOutFunc(this) }}>Logout</a>
            </div>
        </div>
  );
}