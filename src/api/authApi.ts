import { apiClient } from "../services/apiClient";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function loginApi({
  accountCode,
  password,
  device,
}: {
  accountCode: string;
  password: string;
  device: string;
}): Promise<string> {
  const formData = new FormData();
  formData.append("accountCode", accountCode);
  formData.append("password", password);
  formData.append("device", device);

  const res = await apiClient.post("/v1/auth/login", formData);

  return res.data;
}
