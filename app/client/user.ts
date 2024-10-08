import axios from "axios";
import { API_URL } from "./contants";
import { User } from "../models/User";
import { ResponseWrapper } from "./types";

export async function getUsers(): Promise<ResponseWrapper<User[]>> {
  console.log("function call");
  return axios.get(`${API_URL}/users`);
}
