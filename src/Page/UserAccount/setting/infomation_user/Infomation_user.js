import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Information.scss";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { Link, useHistory } from "react-router-dom";
import { updateUser } from "../../../../Redux/apiReques";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../Redux/authSlice";

const Infomation_user = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [name, setName] = useState(user?.User_Name);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(user?.Phone_Number);

  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = user?.accessToken;
  console.log("access token", accessToken);
  console.log("userne", user);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const onchangeName = (event) => {
    setName(event.target.value);
  };
  const onchangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onchangePhone = (event) => {
    setPhone(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const newUser = {
      id: user.ID_User,
      username: name,
      phone: phone,
    };
    updateUser(dispatch, newUser, accessToken, user, axiosJWT);
  };
  return (
    <>
      <form action="" className="infomation" onSubmit={onSubmitForm}>
        <div className="input-container ">
          <i className="fa fa-id-card icon" style={{ width: 22.5 }}></i>
          <input
            type="text"
            placeholder="Họ tên..."
            className="input"
            name="name"
            defaultValue={user?.User_Name}
            onChange={onchangeName}
            required
          />
        </div>
        <div className="input-container ">
          <i className="fa fa-envelope icon" style={{ width: 22.5 }}></i>
          <input
            type="email"
            placeholder="Email..."
            className="input"
            name="email"
            defaultValue={user?.Email}
            readOnly
            onChange={onchangeEmail}
          />
        </div>
        <div className="input-container ">
          <i className="fa fa-phone icon" style={{ width: 22.5 }}></i>
          <input
            type="text"
            placeholder="SĐT..."
            className="input"
            name="phone"
            required
            defaultValue={user?.Phone_Number}
            onChange={onchangePhone}
          />
        </div>
        <br></br>
        <div className="save">
          <button>LƯU</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};
export default Infomation_user;
