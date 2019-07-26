import { combineReducers } from 'redux';
import { album } from './album';
import { position } from './position';

export default combineReducers({
    album,
    position
});
