import { apiClient } from "../services/apiClient";
import type { AccountProfile } from "../types/client";

export async function fetchAccountProfileAPI(): Promise<AccountProfile> {
  const res = await apiClient.get("/accounts/profile");

  const { rc, msg, data } = res.data;

  if (rc === 1) {
    return data;
  } else {
    throw new Error(
      msg || "Không kết nối được server, Vui lòng kiểm tra đường truyền mạng!"
    );
  }
}
