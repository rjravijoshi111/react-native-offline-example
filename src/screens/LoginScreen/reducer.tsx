/**
 * Constants
 */
import { loginAction } from "./action_types";

// Initial State
const initialState = {
    data: undefined,
    refreshToken: "",
    accessToken: "",
    isLoading: false
};

const LoginReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {

        case loginAction.LOGIN: {
            return {
                ...state,
                data: action.payload,
            }
        }
        case loginAction.IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case loginAction.LOGIN_SUCCESS: {
            return {
                ...state,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
            };
        }
        case loginAction.LOGIN_ERROR: {
            return {
                ...state,
                onError: action.payload,
            };
        }
        case loginAction.LOGOUT: {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
};

// Exports
export default LoginReducer;
