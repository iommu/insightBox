/** @jsx jsx */
import { jsx } from "theme-ui";
import "../../styles/GoogleBtn.css";
import AuthButton from "./Oauth";

export const GoogleBtn = () => (
    <AuthButton>
        <div id="gSignInWrapper">
            <span className="label" sx={{ color: "text" }}>
                Sign up with :{" "}
            </span>
            <div id="customBtn" className="customGPlusSignIn">
                <span className="icon"></span>
                <span className="buttonText">Google</span>
            </div>
        </div>
    </AuthButton>
);

export const GoogleBtnAlt = () => (
    <AuthButton>
        <div id="gSignInWrapper">
            <div id="customBtnAlt" className="customGPlusSignIn">
                <span className="iconAlt"></span>
                <span className="buttonTextAlt">Sign in with Google</span>
            </div>
        </div>
    </AuthButton>
);
