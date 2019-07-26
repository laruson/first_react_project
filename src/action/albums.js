import {getAlbums} from '../config/index';
import * as httpMethods from '../constants/httpMethods';
import * as action from '../constants/actionTypes';

export const getMusicAlbums = () => dispatch =>
    dispatch({
        endpoint: getAlbums,
        method: httpMethods.GET,
        types: [
            action.GET_ALBUM_REQUEST,
            action.GET_ALBUM_SUCCESS,
            action.GET_ALBUM_FAILURE
        ]
    });
