import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "./Redux/authSlice";
axios.defaults.withCredentials = true;
const refreshToken = async () => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post("http://localhost:5000/user/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createAxios = (user, dispatch, stateSuccess) => {
  axios.defaults.withCredentials = true;
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        console.log("co zo day!!!", data.accessToken);
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};