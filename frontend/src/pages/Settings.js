import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "urql";

const DeleteAccountMutation = `
mutation DelMut($email: String!) {
  deleteAccount(email: $email)
}
`;

const Settings = (props) => {
  const [email, setEmail] = React.useState("");

  const [result, executeMutation] = useMutation(DeleteAccountMutation);

  const deleteAccount = React.useCallback(() => {
    executeMutation({ email }).then((result) => {
      if (result.data) {
        if (result.data.deleteAccount === 0) {
          console.log("account deletion sucessful! :(");
          localStorage.removeItem("token");
          localStorage.removeItem("old_code");
          props.history.push("/");
        } else {
          console.log("account deletion failed! :(");
          document.getElementById("errorText").innerHTML =
            "Error deleting account, check that the typed email is the email address of this account";
        }
      }
    });
  }, [email, executeMutation]);

  return (
    <div>
      <label for="fname">Please confirm your email address:</label>
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button disabled={result.fetching} onClick={deleteAccount}>
        deleteAccount
      </button>
      <p id="errorText"></p>
    </div>
  );
};

export default withRouter(Settings);
