import * as action from '../constants/actionTypes';
import Geolocation from "react-native-geolocation-service";
import * as httpMethods from "../constants/httpMethods";

export const getPosition = () => dispatch =>
    dispatch({
        method: httpMethods.GET,
        payload: () => new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition((position) => {
                    resolve(position);
                }, () => {
                    reject(new Error('Permission denied'));
                }
            );
        }),
        types: [
            action.CURRENT_POSITION_REQUEST,
            action.CURRENT_POSITION_SUCCESS,
            action.CURRENT_POSITION_FAILURE
        ]
    });
