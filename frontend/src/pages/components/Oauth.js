import React from "react";
import * as Consts from "./Consts";
import { withRouter } from "react-router-dom";

//Authorization popup window code
class AuthButton extends React.Component {
    render() {
        function ShowAuthWindow(that) {
            const dualScreenLeft =
                window.screenLeft !== undefined
                    ? window.screenLeft
                    : window.screenX;
            const dualScreenTop =
                window.screenTop !== undefined
                    ? window.screenTop
                    : window.screenY;

            const width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth
                ? document.documentElement.clientWidth
                : window.screen.width;
            const height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight
                ? document.documentElement.clientHeight
                : window.screen.height;

            const systemZoom = width / window.screen.availWidth;
            const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
            const top = (height - 650) / 2 / systemZoom + dualScreenTop;
            var windowName = "ConnectWithOAuth"; // should not include space for IE
            var windowOptions =
                "location=0,status=0,width=500,height=650,top=" +
                top +
                ",left=" +
                left;
            that._oauthWindow = window.open(
                Consts.OAUTHLINK,
                windowName,
                windowOptions
            );
            // get rid of old token
            var token = localStorage.getItem("token");
            that._oauthInterval = window.setInterval(function () {
                // wait till token changed or we closed the window
                if (
                    token !== localStorage.getItem("token") ||
                    that._oauthWindow.closed
                ) {
                    window.clearInterval(that._oauthInterval);
                    that.props.history.push("/dashboard");
                }
            }, 500);
        }
        return (
            <button
                style={{ background: "transparent", border: "none" }}
                onClick={() => {
                    ShowAuthWindow(this);
                }}
            >
                {this.props.children}
            </button>
        );
    }
}

export default withRouter(AuthButton);
