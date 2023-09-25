import axiosClient from "../apiClient";

export function getForecast(data) {
  return axiosClient.get(
    `/account/forecast/${data.accountId}?month=${data.month}&year=${data.year}`
  );
}
