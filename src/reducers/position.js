import * as types from '../constants/actionTypes';

const initialState = {
    positionLoaded: false,
};

export const position = (state = initialState, action) => {
    const {type, response} = action;
    switch (type) {
        case types.CURRENT_POSITION_REQUEST: {
            return {
                ...state,
                positionLoaded: false
            }
        }
        case types.CURRENT_POSITION_SUCCESS: {
            return {
                ...state,
                positionLoaded: true,
                coords: {
                    longitude: response.coords.longitude,
                    latitude: response.coords.latitude
                }
            };
        }
        case types.CURRENT_POSITION_FAILURE:{
            return {
                ...state,
                positionLoaded: false
            }
        }
        default:
            return state
    }
};
