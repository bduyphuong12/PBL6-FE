import React, { useState } from "react";
import "./register.scss";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../../../Redux/apiReques";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { useDispatch } from "react-redux";
const Register_form = () => {
  const [msgVal, setmsgVal] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [password1, setPassWord1] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const validateAll = () => {
    const msg = {};
    if (isEmpty(username)) {
      msg.username = "Please input your username";
    }
    if (isEmpty(password)) {
      msg.password = "Please input your password";
    }
    if (isEmpty(password1)) {
      msg.password1 = "Please input your password";
    }
    if (isEmpty(email)) {
      msg.email = "Please input your email";
    } else {
      if (!isEmail(email)) {
        msg.email = "Invalid Email";
      }
    }
    if (isEmpty(phone)) {
      msg.phone = "Please input your phone";
    }
    setmsgVal(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const onSubmitLogin = () => {
    const isValid = validateAll();
    if (!isValid) return;
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    setMsg("");
    const isValid = validateAll();
    if (!isValid) return;
    const newUser = {
      username: username,
      password: password,
      confpassword: password1,
      email: email,
      phone: phone,
    };

    registerUser(newUser, dispatch, history, setMsg);
  };
  const onchangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const onchangePassWord = (event) => {
    setPassWord(event.target.value);
  };
  const onchangePassWord1 = (event) => {
    setPassWord1(event.target.value);
  };
  const onchangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onchangePhone = (event) => {
    setPhone(event.target.value);
  };

  return (
    <div className="Fregister">
      <form action="" className="register_form" onSubmit={onSubmitForm}>
        <h2>ĐĂNG KÝ</h2>
        <p>{msg}</p>
        <div className="input-container ">
          <i className="fa fa-user icon" style={{ width: 22.5 }}></i>
          <input
            type="text"
            placeholder="Họ tên..."
            className="input"
            name="username"
            value={username}
            onChange={onchangeUserName}
          />
        </div>
        <p>{msgVal.username}</p>
        <div className="input-container">
          <i className="fa fa-lock icon" style={{ width: 22.5 }}></i>
          <input
            type="password"
            placeholder="Mật khẩu..."
            className="input"
            name="password"
            value={password}
            onChange={onchangePassWord}
          />
        </div>
        <p>{msgVal.password}</p>
        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu..."
            className="input"
            name="password"
            value={password1}
            onChange={onchangePassWord1}
          />
        </div>
        <p>{msgVal.password1}</p>

        <div className="input-container ">
          <i className="fa fa-envelope icon" style={{ width: 22.5 }}></i>
          <input
            type="email"
            placeholder="Email..."
            className="input"
            name="email"
            value={email}
            onChange={onchangeEmail}
          />
        </div>
        <p>{msgVal.email}</p>
        <div className="input-container ">
          <i className="fa fa-phone icon" style={{ width: 22.5 }}></i>
          <input
            type="text"
            placeholder="SĐT..."
            className="input"
            name="phone"
            value={phone}
            onChange={onchangePhone}
          />
        </div>
        <p>{msgVal.phone}</p>
        <button onClick={onSubmitLogin}>ĐĂNG KÝ</button>
        <div className="register">
          <Link id="register" to={"/login"}>
            <label htmlFor="register">Bạn đã có tài khoản?</label>
            <button id="register">ĐĂNG NHẬP</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register_form;
