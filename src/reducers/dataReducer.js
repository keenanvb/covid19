import {
    GET_DATA, GET_COUNTRY_DATA, GET_MAP_DATA,
    COUNTRY_UPDATE, GET_COUNTRY_ADDITIONAL_INFO, GET_TIMESERIES_DATA
} from '../actions/types';

const INITIAL_STATE = {
    data: null,
    countryData: null,
    selectedCountry: '',
    mapData: [],
    countryAdditionalInfo: null,
    timeseriesData: [],
    selectedCountryGraph: '',
    loading: true,
    error: {}
};

export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_DATA:
            return { ...state, data: payload, loading: false }
        case GET_COUNTRY_DATA:
            return { ...state, countryData: payload, loading: false }
        case GET_MAP_DATA:
            return { ...state, mapData: payload, loading: false }
        case GET_TIMESERIES_DATA:
            return { ...state, timeseriesData: payload, loading: false }
        case COUNTRY_UPDATE:
            return { ...state, [payload.prop]: payload.value }
        case GET_COUNTRY_ADDITIONAL_INFO:
            return { ...state, countryAdditionalInfo: payload, loading: false }
        default:
            return state;
    }
}