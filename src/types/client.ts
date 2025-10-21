interface AccountProfileValue {
  PK_CUST_CUSTOMER: string;
  C_BRANCH_CODE: string;
  C_SUB_BRANCH_CODE: string;
  C_MARKETING_ID: string;
  C_MKT_NAME: string;
  C_CUSTOMER_CODE: string;
  C_CARD_ID_TYPE: string;
  C_CARD_ID: string;
  C_ID_ISSUE_DATE: string;
  C_ID_EXPIRE_DATE: string;
  C_ISSUE_PLACE: string;
  C_ISSUE_PLACE_NAME: string;
  C_POLICY_CODE: string;
  C_COMM_PACKAGE: string;
  C_COMM_NAME: string;
  C_COMM_RATE: number;
  C_CUSTOMER_TYPE: string;
  C_TAX_CODE: string;
  C_NATIONAL_CODE: string;
  C_CUSTOMER_NAME: string;
  C_CUST_GENDER: string;
  C_CUST_BIRTH_DAY: string;
  C_VN_FLAG: number;
  C_CUST_EMAIL: string;
  C_CUST_MOBILE: string;
  C_CUST_TEL: string;
  C_CONTACT_ADDRESS: string;
  C_RESEDENCE_ADDRESS: string;
  C_PROVINCE_CODE: string;
  C_AUTHEN_SIGN: string;
  C_FRONT_CARD: string;
  C_BACK_CARD: string;
  C_SIGN_IMG: string;
  C_FACE_IMG: string;
  C_INTERNET_FLAG: number;
  C_PHONE_FLAG: number;
  C_MARGIN_FLAG: number;
  C_IS_FIRST_NICKNAME: number;
  C_ACCOUNT_DEFAULT: string;
  C_USER_NAME: string;
  C_RANK_NAME: string;
  C_ACC_TYPE: string;
  C_POINT_VALUE: number;
  C_AVATAR_IMG: string;
  C_AVATAR_DEFAULT: string;
  C_BACK_GROUND_IMG: string;
  C_SHORT_NAME: string;
  C_PHONE_OTP: string;
}

export type AccountProfile = Partial<AccountProfileValue>;

export type AccountProfileResponse = {
  rc: number;
  msg: string | undefined;
  data?: AccountProfileValue;
};

export interface ChangeNicknamePayload {
  ACTION_TYPE: string;
  PASS_WORD: string;
  NICK_NAME: string;
}

export interface ChangeNicknameForm {
  actionType: string;
  password: string;
  nickname: string;
}

export interface ChangeNicknameResponse {
  rc: number;
  msg: string | null;
  data?: {
    C_ACCOUNT_CODE: string;
    C_NICK_NAME: string;
    C_CHANGE_DATE: string;
  };
}

export type CheckNicknameDataResponse = ChangeNicknameResponse["data"];

export interface ChangeAccountInfoForm {
  email: string;
  address: string;
  phoneNumber?: string;
}

export interface ChangeAccountInfoResponse {
  rc: number;
  msg: string | null;
  data?: {
    C_ACCOUNT_CODE: string;
    C_CHANGE_DATE: string;
  };
}

export type ChangeAccountInfoDataResponse = ChangeAccountInfoResponse["data"];

export interface ChangeAccountInfoPayload {
  CUST_MOBILE: string;
  CUST_EMAIL: string;
  CONTACT_ADDRESS: string;
}

export type ChangeAccountInfoActionPayload = ChangeAccountInfoPayload & {
  otp: string;
};
