import type { RootState } from "../..";
import type { ApiStatus } from "../../../types";

// Selectors với type annotations
export const selectToken = (state: RootState): object | null | string =>
  state.auth.data.token;

export const selectInfoIndexStatus = (state: RootState): ApiStatus =>
  state.auth.status.fetchToken;
