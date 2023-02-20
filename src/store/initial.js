import { cookie } from "../utils/cookie";
import { AUTH_TOKEN } from "../constants/initial";

export const loadState = state => {
  try {
    if (cookie.get(AUTH_TOKEN)) {
      state.userStore.token = cookie.get(AUTH_TOKEN);
    }
    return state;
  } catch (err) {
    return state;
  }
};