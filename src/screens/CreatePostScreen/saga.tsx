import { put, call, takeLatest } from "redux-saga/effects";
import { createPostAction } from "./action_types";
import { request, HTTP_METHODS } from "../../services/services";
import { createPost } from "../../services/api-end-points";
import * as Actions from "./actions";

export function* CreatePostWatcher() {
  yield takeLatest(createPostAction.CREATE_POST, createPostRequest);
}

export function* createPostRequest(action: any) {
  try {
    let requestData = action.payload.data;
    let token = action.payload.token;
    yield put(Actions.setLoading(true));
    const result = yield call(() =>
      request(
        createPost(),
        HTTP_METHODS.POST,
        requestData,
        { "Content-Type": `multipart/form-data` },
        true,
        token
      )
    );
    if (result?.response?.status === 201) {
      let responseData = result?.response?.data;
      yield put(Actions.setLoading(false));

      yield action.payload.onSuccess(result.response);
    } else {
      console.log("error===>>", JSON.stringify(result.response));
      yield put(Actions.setLoading(false))
      //   yield put(Reducer.loginError({message: result.response.error}));
      yield action.payload.onError(result);
    }
  } catch (error: any) {
    console.log("error===>>", JSON.stringify(error));
    yield put(Actions.setLoading(false));
    // const message = error.response.data.message;
    // yield put(Actions.loginSuccess({message}));
    yield action.payload.onError(error);
  }
}
