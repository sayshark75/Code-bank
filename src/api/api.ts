import { AuthData } from "@/TYPES";
import axiosInstance from "./interceptor";
import Cookies from "universal-cookie";

const cookie = new Cookies(null, { path: "/" });

export async function getData(query: string) {
  const res = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}/snippets/search?q=${query}`);
  return await res.data;
}

export async function getFavoritesData() {
  const res = await axiosInstance(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites/`, {
    headers: { Authorization: `Bearer ${cookie.get("accessToken")}` },
  });
  return await res.data;
}

export async function loginUser(authData: AuthData) {
  const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, authData);
  return await res.data;
}

export async function addToFavorites(snippetId: string): Promise<any> {
  const res = await axiosInstance.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/add`,
    { id: snippetId },
    {
      headers: { Authorization: `Bearer ${cookie.get("accessToken")}` },
    }
  );
  return res.data;
}

export async function removeFromFavorites(snippetId: string): Promise<any> {
  const res = await axiosInstance.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/remove`,
    { id: snippetId },
    {
      headers: { Authorization: `Bearer ${cookie.get("accessToken")}` },
    }
  );
  return res.data;
}
