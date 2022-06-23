import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Update_pass.scss";
import isEmpty from "validator/lib/isEmpty";
import { Link, useHistory } from "react-router-dom";
import { updatePassWord, logoutUser } from "../../../../Redux/apiReques";
import { createAxios } from "../../../../createInstance";
import { loginSuccess, logoutSuccess } from "../../../../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update_pass = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  let axiosJWT1 = createAxios(user, dispatch, logoutSuccess);
  const accessToken = user?.accessToken;

  const id = user?.ID_User;
  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [newpass1, setNewPass1] = useState("");
  const [msgVal, setmsgVal] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (newpass != newpass1) {
      toast("Mật khẩu chưa khớp!!!");
    } else {
      const newUser = {
        id: user.ID_User,
        oldpass: oldpass,
        password: newpass,
      };
      updatePassWord(dispatch, newUser, accessToken, axiosJWT, history);
    }
  };

  const onchangeOldPass = (event) => {
    setOldPass(event.target.value);
  };
  const onchangeNewPass = (event) => {
    setNewPass(event.target.value);
  };
  const onchangeNewPass1 = (event) => {
    setNewPass1(event.target.value);
  };
  const validateAll = () => {
    const msg = {};
    if (isEmpty(oldpass)) {
      msg.oldpass = "Please input your old password";
    }
    if (isEmpty(newpass)) {
      msg.newpass = "Please input your new password";
    }
    if (isEmpty(newpass1)) {
      msg.newpass1 = "Please input your new password";
    }
    setmsgVal(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const onSubmitSave = () => {
    const isValid = validateAll();
    if (!isValid) return;
  };
  const handleShowPassWord = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form action="" className="update-pass" onSubmit={onSubmitForm}>
        <div className="input-container">
          <i className="fa fa-lock icon" style={{ width: 22.5 }}></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu cũ..."
            className="input"
            name="oldpassword"
            value={oldpass}
            onChange={onchangeOldPass}
          />
        </div>
        <p>{msgVal.oldpass}</p>
        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu mới..."
            className="input"
            name="newpassword"
            value={newpass}
            onChange={onchangeNewPass}
          />
        </div>
        <p>{msgVal.newpass}</p>
        <div className="input-container">
          <i className="fa fa-check icon"></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu..."
            className="input"
            name="password1"
            value={newpass1}
            onChange={onchangeNewPass1}
          />
        </div>
        <p>{msgVal.newpass1}</p>
        <div className="showpassword">
          <input
            type="checkbox"
            id="showPassWord"
            name="showPassWord"
            value="show"
            onClick={handleShowPassWord}
          />
          <label for="showPassWord">Show Password</label>
        </div>
        <div className="button-submit">
          <button onClick={onSubmitSave}>Đổi mật khẩu</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};
export default Update_pass;
