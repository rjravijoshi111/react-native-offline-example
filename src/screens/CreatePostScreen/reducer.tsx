/**
 * Constants
 */
import { createPostAction } from "./action_types";

// Initial Statt
const initialState = {
    data: undefined,
    onSuccess: undefined,
    onError: undefined,
    isLoading: false
};

const CreatePostReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {

        case createPostAction.CREATE_POST: {
            return {
                ...state,
                data: action.payload,
            }
        }
        case createPostAction.IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case createPostAction.CREATE_POST_SUCCESS: {
            return {
                ...state,
                onSuccess: action.payload
            };
        }
        case createPostAction.CREATE_POST_ERROR: {
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
export default CreatePostReducer;
