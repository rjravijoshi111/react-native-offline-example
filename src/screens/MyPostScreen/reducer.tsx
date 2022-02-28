/**
 * Constants
 */
import { myPostAction } from "./action_types";

// Initial State
const initialState = {
    data: undefined,
    onSuccess: undefined,
    onError: undefined,
    isLoading: false,
    totalCount: 0,
    previous: null,
    next: null,
    listData: []
};

const MyPostReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {

        case myPostAction.MY_POST: {
            return {
                ...state,
                data: action.payload
            }
        }
        case myPostAction.IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case myPostAction.MY_POST_SUCCESS: {
            return {
                ...state,
                data: action.payload.responseData,
                listData: action.payload.listData,
                totalCount: action.payload.count,
                previous: action.payload.previous,
                next: action.payload.next
            };
        }
        case myPostAction.MY_POST_ERROR: {
            return {
                ...state,
                onError: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

// Exports
export default MyPostReducer;
