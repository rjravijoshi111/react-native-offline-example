import { put, call, takeLatest, select } from "redux-saga/effects";
import { myPostAction } from "./action_types";
import { request, HTTP_METHODS } from "../../services/services";
import { getMyPost } from "../../services/api-end-points";
import * as Actions from "./actions";

const getListData = (state: any) => state.MyPostReducer.listData;

export function* MyPostWatcher() {
  yield takeLatest(myPostAction.MY_POST, myPostRequest);
}

export function* myPostRequest(action: any) {
  try {
    let token = action.payload.token;
    let URL = action?.payload?.URL;
    let currentPage = action?.payload?.currentPage;

    let storeListData = yield select(getListData);

    const result = yield call(() =>
      request(`${getMyPost()}?page=${currentPage}`, HTTP_METHODS.GET, {}, {}, true, token)
    );
    if (result?.response?.status === 200) {
      let responseData = result?.response?.data;
      console.log("result-->", responseData);
      yield put(
        Actions.myPostSuccess({
          responseData: responseData,
          listData: currentPage === 1 ? responseData?.results : [...storeListData, ...responseData?.results],
          count: responseData?.count,
          previous: responseData?.previous,
          next: responseData?.next
        }),
      );

      yield put(
        Actions.setLoading(false),
      );

      yield action.payload.onSuccess(result.response);
    } else {
      console.log("error===>>", JSON.stringify(result.response));
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
