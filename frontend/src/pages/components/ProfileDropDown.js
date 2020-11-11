import React from "react";
import { useQuery } from "urql";
import down from "../../images/down.png";

function LogOutFunc(that) {
    localStorage.removeItem("token");
    localStorage.removeItem("ss");
    that.props.history.push("/");
}

export default () => {
    const [result] = useQuery({
        query: `
      query {
        user {
          given_name,
          family_name,
          picture  
        }
      }`,
    });

    const { data, fetching, error } = result;

    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <div>
                    <img
                        id="down-img"
                        alt="dropdown arrow"
                        src={down}
                        width="25"
                    />
                </div>

                <div id="text-profile">Hello, {data.user.given_name}</div>
                <div>
                    <img
                        id="profile-img"
                        alt="user profile pic"
                        src={data.user.picture}
                        width="30"
                    />
                </div>
            </button>
            <div className="dropdown-content">
                <a href="/settings">Settings</a>
                <a
                    href="/"
                    onClick={() => {
                        LogOutFunc(this);
                    }}
                >
                    Logout
                </a>
            </div>
        </div>
    );
};
