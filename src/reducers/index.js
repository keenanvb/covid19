import { combineReducers } from 'redux';
import alertReducer from './alertReducer'
import dataReudcer from './dataReducer'
import countriesReducer from './countriesReducer'


export default combineReducers({
    alert: alertReducer,
    data: dataReudcer,
    countries: countriesReducer
})