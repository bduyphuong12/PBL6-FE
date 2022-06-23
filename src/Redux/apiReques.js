import axios from "axios";
import { toast } from "react-toastify";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  updateSuccess,
  updateFailed,
} from "./authSlice";
export const loginUser = async (user, dispatch, history, setMsg) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/user/login", user);
    console.log("res", res.data);
    dispatch(loginSuccess(res.data));
    history.push("/");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, history, setMsg) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:5000/user/register", user);
    dispatch(registerSuccess());
    toast("Đăng ký thành công!!!");
    history.push("/login");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
    dispatch(registerFailed());
  }
};

export const logoutUser = async (dispatch, id, token, axiosJWT, history) => {
  dispatch(logoutStart());

  try {
    await axiosJWT.post("http://localhost:5000/user/logout", id, {
      withCredentials: true,
      headers: { token: `Bearer ${token}` },
    });
    dispatch(logoutSuccess());
    history.push("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export const updateUser = async (
  dispatch,
  user,
  token,
  currentUser,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put("http://localhost:5000/user/update1", user, {
      withCredentials: true,
      headers: { token: `Bearer ${token}` },
    });
    // currentUser.User_Name = res.data.User_Name;
    // currentUser.Phone_Number = res.data.Phone_Number;
    currentUser = {
      ...currentUser,
      User_Name: res.data.User_Name,
      Phone_Number: res.data.Phone_Number,
    };
    dispatch(loginSuccess(currentUser));
    console.log("check", currentUser);
    toast("Thay đổi thông tin thành công!");
  } catch (error) {
    console.log("loi", error);
    toast("Thay đổi thông tin thất bại!");
  }
};
export const updatePassWord = async (
  dispatch,
  user,
  token,
  axiosJWT,
  history
) => {
  try {
    const res = await axiosJWT.put(
      "http://localhost:5000/user/updatepassword",
      user,
      {
        withCredentials: true,
        headers: { token: `Bearer ${token}` },
      }
    );
    // dispatch(updateSuccess());
    toast("Đổi mật khẩu thành công!");
  } catch (error) {
    // dispatch(updateFailed());
    toast("Đổi mật khẩu thất bại!");
  }
};

// export const updatePassWord = async (dispatch, user, token, axiosJWT, history) => {
//   try {
//     const res = await axiosJWT.put("http://localhost:5000/user/update", user, {
//       withCredentials: true,
//       headers: { token: `Bearer ${token}` },
//     });
//     dispatch(loginSuccess(res.data));
//   } catch (error) {
//     console.log(error);
//   }
// };
