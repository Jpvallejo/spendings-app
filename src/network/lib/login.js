import axiosClient from "../apiClient";

export function login(data) {
  return axiosClient.post("/login", JSON.stringify(data));
}
export function register(data) {
  return axiosClient.post("/sign-up", JSON.stringify(data));
}
