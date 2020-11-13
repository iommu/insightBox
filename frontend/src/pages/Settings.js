import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "urql";
import contrastBg from "../images/contrastBg.svg";

const DeleteAccountMutation = `
mutation DelMut($email: String!) {
  deleteAccount(email: $email)
}
`;

const Settings = (props) => {
    const [email, setEmail] = React.useState("");

    const [result, executeMutation] = useMutation(DeleteAccountMutation);

    const deleteAccount = React.useCallback(
        (props) => {
            executeMutation({ email }).then((result) => {
                if (result.data) {
                    if (result.data.deleteAccount === 0) {
                        console.log("Good luck without us loser");
                        localStorage.removeItem("token");
                        localStorage.removeItem("old_code");
                        props.history.push("/");
                    } else {
                        console.log("account deletion failed! :(");
                        document.getElementById("errorText").innerHTML =
                            "Error deleting account, the typed email must be the email address of this account";
                    }
                }
            });
        },
        [email, executeMutation]
    );

    return (
        <div style={{ height: "100%" }}>
            <div id="settings-page">
                <p id="settings-title">Settings</p>
                <div>
                    <p style={{ textAlign: "left", marginTop: "-1%" }}>
                        <b>Delete account</b>
                    </p>
                    <label>
                        Please confirm your email address:
                    </label>
                    <br />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button disabled={result.fetching} onClick={deleteAccount}>
                        Delete account
                    </button>
                    <p id="errorText"></p>
                </div>
                <div>
                    <p style={{ textAlign: "left", marginTop: "-1%" }}>
                        <b>Change theme</b>
                    </p>
                    <div id="theme-picker">
                        <div style={{backgroundColor:"#eee", color: "#222"}}>Light</div>
                        <div style={{backgroundColor:"#222", color: "#eee"}}>Dark</div>
                        <div style={{backgroundImage: `url(${contrastBg})`, backgroundSize: "cover", color: "#222"}}>Contrast</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Settings);
