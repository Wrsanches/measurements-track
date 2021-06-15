// Redux
import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import data from './data';

export default combineReducers({ auth, data });
