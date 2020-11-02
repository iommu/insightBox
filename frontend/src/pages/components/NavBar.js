import React from "react";
import { Flex, Button, Box, Text } from "rebass";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import AuthButton from "./Oauth";
import ThemeButton from "./ThemeButton";
import logo from "../../images/logo.png";
import GoogleBtn2 from "./GoogleBtn2";
import ProfileDropDown from "./ProfileDropDown";
import {Insights} from "./Insights";



class NavBar extends React.Component {
  render() {
    return (
      <div id="topbar-container" style={{ height: "85px" }}>
        <div id="topbar-fixed">
          <Flex
            px={2}
            py={2}
            color="black"
            bg="white"
            alignItems="center"
            sx={{
              position: "static",
              borderBottom: "3px solid",
              height: "85px",
              borderImage:
                "linear-gradient(to right,  #40a1f1 25%, #65AD50 25%, #65AD50 50%, #FFD151 50%, #FFD151 75%, #f13333 75%, #f13333 100%) 5",
            }}
          >
            <Link to="/">
              <Flex color="black" alignItems="center">
                <img src={logo} alt="insightBox" width="75" />
                <Text fontWeight="bold">insightBox</Text>
              </Flex>
            </Link>
            <Switch>
              <Route path="/signin"></Route>
              <Route path={["/dashboard", "/settings"]}>
                <Box mx="auto" />
                <Insights />
                <ProfileDropDown />
              </Route>
              <Route path="/">
                <Box mx="auto" />
                <Box>
                  <Link to="/" style={{ color: "#333" }}>
                    Home
                  </Link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link to="/about" style={{ color: "#333" }}>
                    Security
                  </Link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link to="/privacypolicy" style={{ color: "#333" }}>
                    Privacy Policy
                  </Link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link to="/termsofuse" style={{ color: "#333" }}>
                    Terms Of Use
                  </Link>
                </Box>
                <Box mx="auto" />
                  <ThemeButton/>
                  <GoogleBtn2 />
              </Route>
            </Switch>
          </Flex>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
