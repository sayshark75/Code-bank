import axiosInstance from "axios";
import { getAccessToken } from "./apiUtils";
import Cookies from "universal-cookie";

const cookie = new Cookies(null, { path: "/" });

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/////////////////////////////////////////////////////
// Create an Interceptor for Incoming Response data.
axiosInstance.interceptors.response.use(
  function (response) {
    console.log("response: ", response);
    if (response.data.message === "login success") {
      const threeHours = 3 * 60 * 60 * 1000;
      const threeHoursFromNow = new Date(Date.now() + threeHours);
      cookie.set("accessToken", response.data.accessToken, { expires: threeHoursFromNow });
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const thirtyDaysFromNow = new Date(Date.now() + thirtyDays);
      cookie.set("refreshToken", response.data.refreshToken, { expires: thirtyDaysFromNow });
    }
    return response;
  },
  async function (error) {
    console.log("error: ", error);
    if (
      (error.response.data.message === "Access token expired" || error.response.data.message === "Invalid access token") &&
      error.config &&
      !error.config.isRetry
    ) {
      console.log("getting access token");
      const data = await getAccessToken(cookie.get("refreshToken"));
      if (data.status) {
        error.config.headers.Authorization = `Bearer: ${cookie.get("accessToken")}`;
        error.config.isRetry = true;
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
