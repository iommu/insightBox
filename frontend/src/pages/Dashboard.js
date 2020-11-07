import React from "react";
import { withRouter } from "react-router-dom";
import {
    Graph1,
    Graph2,
    Graph3,
    Graph4,
    Graph5,
    Graph6,
    Graph7,
    Graph8,
    Graph9,
} from "./components/Graphs";
import { WordCloud } from "./components/WordCloud";
import SideBar from "./components/SideBar";
import { GraphTest2 } from "./components/GraphTest2";
import { GraphTest3 } from "./components/GraphTest3";
import moment from "moment";
import { Cipher } from "./Cipher";
// import react-grid-layout
import { Responsive, WidthProvider } from "react-grid-layout";
import "../styles/react-grid-layout/grid-styles.css";
import "../styles/react-grid-layout/resizeble-styles.css";
const ResponsiveGridLayout = WidthProvider(Responsive);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("token")) {
            console.log("error: no login token, redirecting");
            this.props.history.push("/");
        }

        this.state = {
            startDate: moment().subtract(7, "day"), // sets default dashboard dates to be current date subtract 7 days
            endDate: moment().subtract(0, "day"),
            currentBreakPoint: "lg",
            compactType: "horizontal",
        };

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint,
        });
    }

    updateDates = (startDate, endDate) => {
        this.setState({
            startDate: startDate,
            endDate: endDate,
        });
    };

    render() {
        return (
            <div id="dash-container">
                <Cipher />
                <SideBar updateDates={this.updateDates} />
                <div
                    className="dashboard-content"
                    style={{
                        marginLeft: "340px",
                        color: "#333",
                        height: "auto",
                    }}
                >
                    <ResponsiveGridLayout
                        className="layout"
                        rowHeight={120}
                        onBreakpointChange={this.onBreakpointChange}
                        breakpoints={{
                            lg: 1200,
                            md: 960,
                            sm: 720,
                            xs: 480,
                            xxs: 240,
                        }}
                        cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
                        measureBeforeMount={true}
                        compactType={this.state.compactType}
                        verticalCompact={true}
                    >
                        <div
                            key="Graph1"
                            data-grid={{ x: 0, y: 0, w: 2, h: 2 }}
                        >
                            <Graph1 />
                        </div>
                        <div
                            key="Graph2"
                            data-grid={{ x: 2, y: 0, w: 4, h: 2 }}
                        >
                            <Graph2 />
                        </div>
                        <div
                            key="Graph3"
                            data-grid={{ x: 6, y: 0, w: 2, h: 2 }}
                        >
                            <Graph3 />
                        </div>
                        <div
                            key="Graph4"
                            data-grid={{ x: 8, y: 0, w: 2, h: 2 }}
                        >
                            <Graph4 />
                        </div>
                        <div
                            key="Graph5"
                            data-grid={{ x: 4, y: 4, w: 4, h: 2 }}
                        >
                            <Graph5 />
                        </div>
                        <div
                            key="Graph6"
                            data-grid={{ x: 4, y: 2, w: 2, h: 2 }}
                        >
                            <Graph6 />
                        </div>
                        <div
                            key="Graph7"
                            data-grid={{ x: 6, y: 2, w: 2, h: 2 }}
                        >
                            <Graph7 />
                        </div>
                        <div
                            key="Graph8"
                            data-grid={{ x: 8, y: 2, w: 2, h: 2 }}
                        >
                            <Graph8 />
                        </div>
                        <div
                            key="Wordcloud"
                            data-grid={{ x: 0, y: 2, w: 4, h: 4 }}
                        >
                            <WordCloud />
                        </div>
                        
                        <div key="GraphTest2" data-grid={{x: 1, y: 0, w: 2, h: 4}}>
                            <GraphTest2 
                                sDate={this.state.startDate.toISOString()}
                                eDate={this.state.endDate.toISOString()}
                            />
                        </div>
                        <div key="GraphTest3" data-grid={{x: 1, y: 0, w: 2, h: 2}}>
                            <GraphTest3 
                                sDate={this.state.startDate.toISOString()}
                                eDate={this.state.endDate.toISOString()}
                            />
                        </div>
                        <div
                            key="Graph9"
                            data-grid={{ x: 8, y: 4, w: 2, h: 2 }}
                        >
                            <Graph9 />
                        </div>
                    </ResponsiveGridLayout>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
