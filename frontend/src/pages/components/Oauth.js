import React from 'react';
import * as Consts from './Consts';
import { withRouter } from 'react-router-dom';

//Authorization popup window code
class AuthButton extends React.Component {
  render() {
    function ShowAuthWindow(that) {
      console.log('ee');
      var windowName = 'ConnectWithOAuth'; // should not include space for IE
      var windowOptions = 'location=0,status=0,width=800,height=400';
      that._oauthWindow = window.open(Consts.OAUTHLINK, windowName, windowOptions);
      // set loggingin token true
      var token = localStorage.getItem("token");
      that._oauthInterval = window.setInterval(function () {
        // wait till token changed or we closed the window
        if(token !== localStorage.getItem("token" || that._oauthWindow.closed)){
          window.close();
          that.props.history.push("/dashboard");
        }
      }, 500);
    }
    return (
      <button style={{ background: 'transparent', border: 'none' }} onClick={() => { ShowAuthWindow(this) }}>
        {this.props.children}
      </button>
    )
  }
}

export default withRouter(AuthButton);