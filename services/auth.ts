import { API_URL } from "@constants/Api";
import User from "../types/User";
import axios, { AxiosError } from "axios";
//import { API_URL } from "./config";

export const tenantLogin: any = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/users/tenant-login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Failed to log in:", error.message);
    throw error;
  }
};
//http://192.168.88.33:8000/api/v1/users/tenant-login
