import type { RootState } from "../..";
import type { ApiStatus } from "../../../types";
import type { AccountProfile } from "../../../types/client";

export const selectLoginModalOpen = (state: RootState): boolean =>
  state.client.data.loginModalOpen;

export const selectAccountProfile = (state: RootState): AccountProfile | null =>
  state.client.data.accountProfile;

export const selectAccountProfileStatus = (state: RootState): ApiStatus =>
  state.client.status.fetchAccountProfile;
