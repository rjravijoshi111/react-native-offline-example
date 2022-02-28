import { myPostAction } from "./action_types";
export const myPost = ({ currentPage, token, data, onSuccess, onError }: any) => ({
  type: myPostAction.MY_POST,
  payload: {
    currentPage,
    token,
    data: data,
    onSuccess: onSuccess,
    onError: onError,
  },
});

export const myPostSuccess = (data: any) => ({
  type: myPostAction.MY_POST_SUCCESS,
  payload: data,
});

export const myPostError = (data: any) => ({
  type: myPostAction.MY_POST_ERROR,
  payload: data,
});

export const setLoading = (isLoading: any) => ({
  type: myPostAction.IS_LOADING,
  payload: isLoading
});
