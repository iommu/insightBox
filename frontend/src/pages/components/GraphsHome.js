import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,

} from "recharts";

export const Graph1Home = () => {
    const graphdata = [
        { name: "Monday", Total: 23 },
        { name: "Tuesday", Total: 26 },
        { name: "Wednesday", Total: 24 },
        { name: "Thursday", Total: 47 },
        { name: "Friday", Total: 33 },
        { name: "Sunday", Total: 11 },
        { name: "Sunday", Total: 10 },
    ];

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
                    dataKey="Total"
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

export const Graph2Home = () => {
    const graphdata = [
        { name: "M", Total: 23, pv: 2400, amt: 2400 },
        { name: "T", Total: 26, pv: 2400, amt: 2400 },
        { name: "W", Total: 24, pv: 2400, amt: 2400 },
        { name: "T", Total: 47, pv: 2400, amt: 2400 },
        { name: "F", Total: 33, pv: 2400, amt: 2400 },
        { name: "S", Total: 11, pv: 2400, amt: 2400 },
        { name: "S", Total: 10, pv: 2400, amt: 2400 },
    ];

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

export const Graph3Home = () => {
    var avg_day = 11.3;
    var avg_week = 79.1;
    var avg_month = 316.4;

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

export const Graph4Home = () => {
    const graphdata = [
        { "name": "Sunday", "values": 10},
        { "name": "Monday", "values": 23},
        { "name": "Tuesday", "values": 26},
        { "name": "Wednesday", "values": 24},
        { "name": "Thursday", "values": 47},
        { "name": "Friday", "values": 33},
        { "name": "Saturday", "values": 11},
        
    ];

    return (
        <div>
            <div className="graph-title">Received per Week Day</div>
            <RadarChart
                outerRadius={65}
                width={270}
                height={140}
                data={graphdata}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis />
                <Radar
                    name="Received"
                    dataKey="values"
                    stroke="#FF8042"
                    fill="#FF8042"
                    fillOpacity={0.6}
                />
                <Tooltip />
            </RadarChart>
        </div>
    );
};

export const Graph5Home = () => {
    const graphdata = [
        { name: "M", Received: 23, Sent: 9, amt: 2400 },
        { name: "T", Received: 26, Sent: 10, amt: 2400 },
        { name: "W", Received: 24, Sent: 15, amt: 2400 },
        { name: "T", Received: 47, Sent: 24, amt: 2400 },
        { name: "F", Received: 33, Sent: 13, amt: 2400 },
        { name: "S", Received: 11, Sent: 2, amt: 2400 },
        { name: "S", Received: 10, Sent: 3, amt: 2400 },
    ];

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

export const Graph6Home = () => {
    const graphdata = [
        { name: "Monday", Total: 23 },
        { name: "Tuesday", Total: 26 },
        { name: "Wednesday", Total: 24 },
        { name: "Thursday", Total: 47 },
        { name: "Friday", Total: 33 },
        { name: "Sunday", Total: 11 },
        { name: "Sunday", Total: 10 },
    ];

    var graphdata1 = [];
    var weeks = ["7 days (current)", "7 days (previous)"];
    var total1 = 0;
    var total2 = 146;

    for (var i = 0; i < 7; i++) {
        total1 += graphdata[i].Total;
    }

    var value1 = { Weeks: weeks[0], Total: total1 };
    var value2 = { Weeks: weeks[1], Total: total2 };
    graphdata1.push(value2);
    graphdata1.push(value1);

    return (
        <div>
            <div className="graph-title">Weekly Trend (Received)</div>
            <LineChart
                width={260}
                height={155}
                data={graphdata1}
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
