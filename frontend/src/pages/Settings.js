import React from "react";
import { useHistory } from "react-router-dom";

function Settings() {
  const history = useHistory();

  function delAcc() {
    console.log("//TODO: delete account");
    // localStorage.removeItem("token");
    // localStorage.removeItem("old_code");
    // send query
    history.push("/");
  }

  return <button onClick={delAcc}>Delete Account</button>;
}

export default Settings;
