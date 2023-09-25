import axiosClient from "../apiClient";

export function login(data) {
  return axiosClient.post("/login", JSON.stringify(data));
}
