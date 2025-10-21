export interface LoginPayload {
  accountCode: string;
  password: string;
  device: string;
}

export interface LoginResponse {
  rc: number;
  msg: string;
  data: {
    sessionId: string;
    C_ACCOUNT_CODE: string;
    C_USER_CODE: string;
    C_ACCOUNT_NAME: string;
    C_CUSTOMER_CODE: string;
    C_AUTHEN_FLAG: string;
    C_RESET_FLAG: number;
    C_COUNT_LOGIN: number;
    C_AUTHEN_TYPE: string;
    C_LIST_FUNC: string;
    C_SERIAL_NUMBER: string;
    C_COUNT_DAY: number | null;
  };
}

export type Token = LoginResponse["data"] | null;

export interface FetchOtpPayload {
  channel: string;
}

export interface ConfirmOtpForm {
  otp: string;
}

export interface FetchOtpResponse {
  rc: number;
  msg: string | null;
  data?: {
    otp: string;
  };
}

export type FetchOtpDataResponse = FetchOtpResponse["data"];
