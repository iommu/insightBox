/** @jsx jsx */
import { jsx } from "theme-ui";
import { Flex, Text } from "rebass";
import { Switch, Route, Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import logo from "../../images/logo.png";
import { GoogleBtnAlt } from "./GoogleBtn";
import ProfileDropDown from "./ProfileDropDown";
import { Insights } from "./Insights";

export default (props) => (
    <div id="topbar-container" style={{ height: "85px" }}>
        <div id="topbar-fixed">
            <Flex
                px={2}
                py={2}
                alignItems="center"
                sx={{
                    backgroundColor: "secondary",
                    color: "text",
                    position: "static",
                    borderBottom: "3px solid",
                    height: "85px",
                    borderImage:
                        "linear-gradient(to right,  #40a1f1 25%, #65AD50 25%, #65AD50 50%, #FFD151 50%, #FFD151 75%, #f13333 75%, #f13333 100%) 5",
                }}
            >
                <Link to="/">
                    <Flex alignItems="center">
                        <img src={logo} alt="insightBox" width="75" />
                        <Text sx={{ color: "text" }} fontWeight="bold">
                            insightBox
                        </Text>
                    </Flex>
                </Link>
                <Switch>
                    <Route path="/signin"></Route>
                    <Route path={["/dashboard", "/settings"]}>
                        <div sx={{ margin: "0 auto" }} />
                        <ThemeButton />
                        <Insights />
                        <ProfileDropDown />
                    </Route>
                    <Route path="/">
                        <div sx={{ margin: "0 auto" }} />
                        <div>
                            <Link to="/" sx={{ color: "text" }}>
                                Home
                            </Link>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/about" sx={{ color: "text" }}>
                                Security
                            </Link>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/privacypolicy" sx={{ color: "text" }}>
                                Privacy Policy
                            </Link>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/termsofuse" sx={{ color: "text" }}>
                                Terms Of Use
                            </Link>
                        </div>
                        <div sx={{ margin: "0 auto" }} />
                        <ThemeButton />
                        <GoogleBtnAlt />
                    </Route>
                </Switch>
            </Flex>
        </div>
    </div>
);
