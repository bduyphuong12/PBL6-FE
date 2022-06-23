import React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <ul>
        <li>
          <NavLink to="info" activeClassName="active">
            Thông tin
          </NavLink>
        </li>
        <li>
          <NavLink to="update-pass" activeClassName="active">
            Đổi mật khẩu
          </NavLink>
        </li>
        <li>
          <NavLink to="history" activeClassName="active">
            Lịch sử
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
