import { createPostAction } from "./action_types";
export const createPost = ({ token, data, onSuccess, onError }: any) => ({
  type: createPostAction.CREATE_POST,
  payload: {
    token,
    data: data,
    onSuccess: onSuccess,
    onError: onError,
  },
  meta: {
    retry: true,
  },
});

export const createPostSuccess = (data: any) => ({
  type: createPostAction.CREATE_POST_SUCCESS,
  payload: data,
});

export const createPostError = (data: any) => ({
  type: createPostAction.CREATE_POST_ERROR,
  payload: data,
});

export const setLoading = (isLoading: any) => ({
  type: createPostAction.IS_LOADING,
  payload: isLoading,
});
