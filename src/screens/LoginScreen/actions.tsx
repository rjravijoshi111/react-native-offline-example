import { loginAction } from "./action_types";
export const userLogin = ({ data, onSuccess, onError }: any) => ({
  type: loginAction.LOGIN,
  payload: {
    data: data,
    onSuccess: onSuccess,
    onError: onError,
  },
});

export const loginSuccess = (data: any) => ({
  type: loginAction.LOGIN_SUCCESS,
  payload: data,
});

export const loginError = (data: any) => ({
  type: loginAction.LOGIN_ERROR,
  payload: data,
});

export const setLoading = (isLoading: any) => ({
  type: loginAction.IS_LOADING,
  payload: isLoading
});

export const logout = () => ({
  type: loginAction.LOGOUT,
});