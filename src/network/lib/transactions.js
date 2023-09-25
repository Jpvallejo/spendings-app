import axiosClient from "../apiClient";

export function getByCategory(data) {
  return axiosClient.get(`/transactions/by-category?month=${data.month}&year=${data.year}`);
}
