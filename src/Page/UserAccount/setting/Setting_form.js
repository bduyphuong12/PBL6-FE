import React from "react";
import "./setting.scss";
import Sidebar from "../sidebar/Sidebar";
import Infomation_user from "./infomation_user/Infomation_user";
import History from "./history/History";
import Update_pass from "./update_password/Update_pass";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const Setting_form = () => {
  return (
    <Router>
      <div className="container-setting">
        <div className="setting-container">
          <h2>THÔNG TIN TÀI KHOẢN</h2>
          <div className="content">
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                <Infomation_user />
              </Route>
              <Route path="/info">
                <Infomation_user />
              </Route>
              <Route path="/update-pass">
                <Update_pass />
              </Route>
              <Route path="/history">
                <History />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Setting_form;
