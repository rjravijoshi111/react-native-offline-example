import { put, call, takeLatest } from "redux-saga/effects";
import { loginAction } from "./action_types";
import { request, HTTP_METHODS } from "../../services/services";
import { getLogin } from "../../services/api-end-points";
import * as Actions from "./actions";

export function* UserLoginWatcher() {
  yield takeLatest(loginAction.LOGIN, loginRequest);
}

export function* loginRequest(action: any) {
  try {
    let requestData = action.payload.data;
    yield put(Actions.setLoading(true));
    console.log("loginRequest-->", getLogin(), HTTP_METHODS.POST, requestData);
    const result = yield call(() =>
      request(getLogin(), HTTP_METHODS.POST, requestData)
    );
    if (result?.response?.status === 200) {
      let responseData = result?.response?.data;
      console.log("result-->", responseData);

      yield put(
        Actions.loginSuccess({
          refreshToken: responseData?.refresh || "",
          accessToken: responseData?.access || "",
        })
      );

      yield put(Actions.setLoading(false));

      yield action.payload.onSuccess(result.response);
    } else {
      //   yield put(Reducer.loginError({message: result.response.error}));
      yield action.payload.onError(result.response);
    }
  } catch (error: any) {
    console.log("error===>>", JSON.stringify(error));
    // const message = error.response.data.message;
    // yield put(Actions.loginSuccess({message}));
    yield action.payload.onError(error.data);
  }
}
