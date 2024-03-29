import { API_URL } from "@constants/Api";
import User from "../types/User";
import axios, { AxiosError } from "axios";
//import { API_URL } from "./config";

export const verifyInvite: any = async (code: String) => {
  try {
    const res = await axios.get(`${API_URL}invites/verify/${code}`);
    return res.data;
  } catch (error: any) {
    console.error("Failed to log in:", error.message);
    throw error;
  }
};
export const updateStatus: any = async (
  code: String,
  status: "grant" | "reject"
) => {
  try {
    console.log();
    const res = await axios.post(
      `${API_URL}invites/${code}/${status === "grant" && "true"}`
    );
    return res.data;
  } catch (error: any) {
    console.error("Failed to log in:", error.message);
    throw error;
  }
};

// const updateStatus =()=>{
//   invites/:code/:status
// }
//http://192.168.88.33:8000/api/v1/users/tenant-login
