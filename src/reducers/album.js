import * as types from '../constants/actionTypes';

const initialState = {
    isLoading: true
};

export const album = (state = initialState, action) => {
    const {type, result, request} = action;
    switch (type) {
        case types.GET_ALBUM_REQUEST:
            return {
                ...state,
                isLoading: true,
                request: request
            };
        case types.GET_ALBUM_SUCCESS:
            return {
                isLoading: false,
                response: result,
                request: request
            };
        case types.GET_ALBUM_FAILURE:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};
