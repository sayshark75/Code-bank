import axiosInstance from "./interceptor";

import Cookies from "universal-cookie";

const cookie = new Cookies(null, { path: "/" });

export const getAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("no refreshtoken");
  }
  const resData = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/access-token`, { refreshToken });
  if (resData.statusText !== "OK") {
    throw new Error("internal server error");
  }

  if (resData.data.message === "Token Refreshed") {
    const threeHours = 3 * 60 * 60 * 1000;
    const threeHoursFromNow = new Date(Date.now() + threeHours);
    cookie.set("accessToken", resData.data.accessToken, { expires: threeHoursFromNow });
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const thirtyDaysFromNow = new Date(Date.now() + thirtyDays);
    cookie.set("refreshToken", resData.data.refreshToken, { expires: thirtyDaysFromNow });
  }

  return resData.data;
};
