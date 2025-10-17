import { apiClient } from "../services/apiClient";
import type { LoginRequest, LoginResponse } from "../types";

export async function loginApi({
  accountCode,
  password,
  device,
}: LoginRequest): Promise<LoginResponse["data"]> {
  const payload = { accountCode, password, device };
  const res = await apiClient.post<LoginResponse>("/v1/auth/login", payload);
  const { rc, msg, data } = res.data;

  if (rc === 1) {
    localStorage.setItem("sessionId", data.sessionId);
    localStorage.setItem("token", JSON.stringify(data));
    return data;
  } else {
    throw new Error(msg || "Đăng nhập thất bại");
  }
}
