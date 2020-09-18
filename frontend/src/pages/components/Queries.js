import React from 'react'; 
// import graphql and create client
import { useQuery } from 'urql';
import down from '../../images/down.png';

// import graphql and create client
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://insightbox.xyz/api',
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? token : "" },
    };
  },
});

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

  return (
    <table>
      <tr><td>date</td>number of emails recv</tr>
      {result.data.data.map(day => (
        <tr>
          <td>{day.date}</td><td>{day.received}</td>
        </tr>
      ))}
    </table>
  );
}
/*
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

const renderBarChart = (
  <BarChart width={600} height={200} data={data}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="uv" fill="#8884d8" barSize={30} />
  </BarChart>
);
*/




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

  <div class="dropdown">
            <button class="dropbtn">
                
                
                <div>
                    <img id="down-img" src={down} width="25"/>
                </div>
                
                <div id="text-profile">
                    Hello, {data.user.given_name}
                </div>
                <div>
                    <img id="profile-img" src={data.user.picture} width="30"/>
                </div>
            </button>
            <div class="dropdown-content">
                <a href="/dashboard">Settings</a>
                <a href="/" onClick={() => { LogOutFunc(this) }}>Logout</a>
            </div>
        </div>
  );
}