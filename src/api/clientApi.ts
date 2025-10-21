import { apiClient } from "../services/apiClient";
import type {
  AccountProfile,
  ChangeNicknamePayload,
  ChangeNicknameResponse,
} from "../types/client";

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

export const changeNicknameApi = async (
  payload: Pick<ChangeNicknamePayload, "NICK_NAME">
): Promise<ChangeNicknameResponse> => {
  const res = await apiClient.put<ChangeNicknameResponse>(
    "/accounts/changeNickname",
    payload
  );
  return res.data;
};

export const checkNicknameApi = async (
  payload: Pick<ChangeNicknamePayload, "NICK_NAME">
): Promise<ChangeNicknameResponse> => {
  console.log("payload", payload);

  const res = await apiClient.request<ChangeNicknameResponse>({
    url: "/accounts/checkNickname",
    method: "GET",
    data: payload,
  });
  return res.data;
};
