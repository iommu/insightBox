import React from "react";
import { useQuery } from "urql";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    CartesianGrid,
    RadialBarChart,
    RadialBar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
} from "recharts";

// init date variables
const now = new Date();
var m8 = new Date();
// for some reason you have to set the date back an extra day if you want 7 days returned from graphql
m8.setDate(m8.getDate() - 8); // ie: minus 8 days from today's date
var m15 = new Date();
m15.setDate(m15.getDate() - 15);
var m30 = new Date();
m30.setDate(m30.getDate() - 30);
var m57 = new Date();
m57.setDate(m57.getDate() - 57);

export const Graph1 = () => {
    console.log("re-render");
    const COLORS = [
        "#40a1f1",
        "#65AD50",
        "#FFD151",
        "#FF8042",
        "#f13333",
        "#9636ff",
        "#3461d1",
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const [result] = useQuery({
        query:
            `
    query {
      data(start:"` +
            m8.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
        date,
        received
      }
    }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var busiestDay = "";
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    // order doesnt matter here
    var most = 0;
    for (var i = 0; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        if (received > most) {
            most = received;
            busiestDay = days[day];
        }
        var value = { name: days[day], value: received };
        graphdata.push(value);

        localStorage.busiestDay = busiestDay;
    }
    return (
        <div>
            <div className="graph-title">
                Email Received %<br /> Day of the Week
            </div>

            <PieChart width={170} height={150}>
                <Pie
                    data={graphdata}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="100%"
                    fill="#8884d8"
                    dataKey="value"
                >
                    {graphdata.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip wrapperStyle={{ backgroundColor: "#ccc" }} />
            </PieChart>
        </div>
    );
};

export const Graph2 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m8.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
          date,
          received
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    // order matters here, array is oldest day first
    for (var i = 0; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var value = { name: days[day], Total: received, pv: 2400, amt: 2400 };
        graphdata.push(value);
    }
    return (
        <div>
            <div className="graph-title">Emails Received per Day</div>

            <BarChart
                width={400}
                height={165}
                data={graphdata}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
                <XAxis dataKey="name" stroke="#47494d" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="Total" fill="#40a1f1" barSize={30} />
            </BarChart>
        </div>
    );
};

export const Graph3 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m57.toISOString() +
            `", end:"` +
            m8.toISOString() +
            `") {
          date,
          received
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var rlen = result.data.data.length;
    var total = 0;
    var avg_day, avg_week, avg_month;
    for (var i = 0; i < rlen; i++) {
        var received = result.data.data[i].received;
        total += received;
    }
    avg_day = total / 56.0;
    avg_week = total / 8.0;
    avg_month = total / 2.0;

    if (!Number.isInteger(avg_day)) {
        avg_day = avg_day.toFixed(2);
    }

    if (!Number.isInteger(avg_week)) {
        avg_week = avg_week.toFixed(2);
    }

    if (!Number.isInteger(avg_month)) {
        avg_month = avg_month.toFixed(2);
    }

    return (
        <div id="graph3">
            <div className="graph-title">Received</div>

            <div className="graph-title2">Average per Day</div>
            <div className="numbers">{avg_day}</div>

            <div className="graph-title2">Average per Week</div>
            <div className="numbers">{avg_week}</div>

            <div className="graph-title2">Average per Month</div>
            <div className="numbers">{avg_month}</div>
        </div>
    );
};

export const Graph4 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m8.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
          date,
          received,
          sent
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Sunday",
    ];
    var colours = [
        "#40a1f1",
        "#65AD50",
        "#FFD151",
        "#FF8042",
        "#f13333",
        "#9636ff",
        "#3461d1",
    ];
    var counter = 0;
    for (var i = rlen - 1; i > -1; i--) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var value = {
            name: days[day],
            Received: received,
            fill: colours[6 - counter++],
        };
        graphdata.push(value);
    }

    return (
        <div>
            <div className="graph-title">
                Emails Recieved
                <br />
                per Week Day
            </div>

            <RadialBarChart
                width={190}
                height={150}
                innerRadius={8}
                outerRadius={80}
                barSize={7}
                data={graphdata}
            >
                <RadialBar
                    minAngle={15}
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    clockWise
                    dataKey="Received"
                />
                <Tooltip />
            </RadialBarChart>
        </div>
    );
};

export const Graph5 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m8.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
          date,
          received,
          sent
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = ["S", "M", "T", "W", "T", "F", "S"];
    for (var i = 0; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var sent = result.data.data[i].sent;
        var value = {
            name: days[day],
            Received: received,
            Sent: sent,
            amt: 2400,
        };
        graphdata.push(value);
    }
    return (
        <div>
            <div className="graph-title">Sent vs Received</div>
            <LineChart
                width={410}
                height={160}
                data={graphdata}
                margin={{
                    top: 20,
                    right: 20,
                    left: -30,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Received"
                    stroke="#40a1f1"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Sent" stroke="#65AD50" />
            </LineChart>
        </div>
    );
};

export const Graph6 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m57.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
          date,
          sent
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var rlen = result.data.data.length;
    var total = 0;
    var avg_day, avg_week, avg_month;
    for (var i = 0; i < rlen; i++) {
        var sent = result.data.data[i].sent;
        total += sent;
    }
    avg_day = total / 56.0;
    avg_week = total / 8.0;
    avg_month = total / 2.0;

    if (!Number.isInteger(avg_day)) {
        avg_day = avg_day.toFixed(2);
    }

    if (!Number.isInteger(avg_week)) {
        avg_week = avg_week.toFixed(2);
    }

    if (!Number.isInteger(avg_month)) {
        avg_month = avg_month.toFixed(2);
    }

    return (
        <div id="graph3">
            <div className="graph-title">Sent</div>

            <div className="graph-title2">Average per Day</div>
            <div className="numbers">{avg_day}</div>

            <div className="graph-title2">Average per Week</div>
            <div className="numbers">{avg_week}</div>

            <div className="graph-title2">Average per Month</div>
            <div className="numbers">{avg_month}</div>
        </div>
    );
};

export const Graph7 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m15.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
          date,
          received
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    var graphdata = [];
    var weeks = ["7 days (previous)", "7 days (current)"];
    var total1 = 0;
    var total2 = 0;

    for (var i = 0; i < 14; i++) {
        if (i < 7) {
            // week 1
            total1 += result.data.data[i].received;
        } else {
            // week 2
            total2 += result.data.data[i].received;
        }
    }

    var value1 = { Weeks: weeks[0], Total: total1 };
    var value2 = { Weeks: weeks[1], Total: total2 };
    graphdata.push(value1);
    graphdata.push(value2);

    return (
        <div>
            <div className="graph-title">Weekly Trend (Received)</div>
            <LineChart
                width={280}
                height={160}
                data={graphdata}
                margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Weeks" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Total"
                    stroke="#65AD50"
                    activeDot={{ r: 10 }}
                />
            </LineChart>
        </div>
    );
};

export const Graph8 = () => {
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m8.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
          date,
          received
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // do computation here
    var graphdata = [];
    var rlen = result.data.data.length;
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    // order doesnt matter here
    for (var i = 0; i < rlen; i++) {
        var date = new Date(result.data.data[i].date);
        var day = date.getDay(date);
        var received = result.data.data[i].received;
        var value = { name: days[day], value: received };
        graphdata.push(value);
    }

    return (
        <div>
            <div className="graph-title">Received per Week Day</div>
            <RadarChart
                outerRadius={65}
                width={280}
                height={166}
                data={graphdata}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis />
                <Radar
                    name="Received"
                    dataKey="value"
                    stroke="#FF8042"
                    fill="#FF8042"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>
        </div>
    );
};

function getRepetition(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
}

export const Graph9 = () => {
    // var start = moment(dates.sDate).subtract(1,"day").toISOString();  //subtract one day to match the sidebar
    const [result] = useQuery({
        query:
            `
      query {
        data(start:"` +
            m30.toISOString() +
            `", end:"` +
            now.toISOString() +
            `") {
       
          emails{id,poi_email},
        }
      }`,
    });

    const { fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    //console.log(result);
    // do computation here

    //generates a simple aggregate list of received contacts
    var emailList = [];
    for (let i = 0; i < result.data.data.length; i++) {
        for (let j = 0; j < result.data.data[i].emails.length; j++) {
            emailList.push(result.data.data[i].emails[j].poi_email);
        }
    }
    //console.log(emailList);

    //code to generate matches
    var matched = [];
    var matchedCount = [];
    for (let i = 0; i < emailList.length; i++) {
        //console.log(getRepetition(emailList, emailList[i]));

        if (matched.length === 0) {
            matched.push(emailList[i]);
            matchedCount.push(getRepetition(emailList, emailList[i]));
        } else if (matched.includes(emailList[i]) === false) {
            matched.push(emailList[i]);
            matchedCount.push(getRepetition(emailList, emailList[i]));
        }
    }

    // console.log(matched)
    //console.log(matchedCount)

    var final = [];
    let finalTest = new Map();
    for (let i = 0; i < matched.length; i++) {
        final.push([matched[i], matchedCount[i]]);
        finalTest.set(matched[i], matchedCount[i]);
    }

    //console.log(final);
    //console.log(finalTest);
    //console.log([...finalTest.entries()].reduce((a, f ) => f[1] > a[1] ? f : a)); //logic to get most contacted
    const mostContact = [...finalTest.entries()].reduce((a, f) =>
        f[1] > a[1] ? f : a
    );
    //console.log(mostContact);

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
};
