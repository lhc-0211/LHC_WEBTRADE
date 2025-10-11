import type { RootState } from "../..";
import type { ApiStatus } from "../../../types";

// Selectors với type annotations
export const selectToken = (state: RootState): unknown => state.auth.data.token;

export const selectInfoIndexStatus = (state: RootState): ApiStatus =>
  state.auth.status.fetchToken;
