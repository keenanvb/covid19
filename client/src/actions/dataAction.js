import axios from 'axios'
import {
    GET_DATA, GET_COUNTRY_DATA, GET_MAP_DATA, COUNTRY_UPDATE, GET_COUNTRY_ADDITIONAL_INFO, GET_TIMESERIES_DATA,
    GET_MAP_DATA_SOUTH_AFRICA, GET_TIMESERIES_DATA_COMPARE
} from './types';
import { setAlert } from './index'

const emoji = ['🤷‍♂️', '🤷‍♀️'];

let getRandomEmoji = () => {
    let random = Math.floor(Math.random() * 2) + 0;
    return emoji[random]
}

export const getData = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`https://covid19.mathdro.id/api/`);
            dispatch({
                type: GET_DATA,
                payload: res.data
            })
            // dispatch(setAlert('Global stats available', 'success'))
        } catch (err) {
            dispatch(setAlert('No stats data available', 'danger'))
            console.log('err', err);
        }
    }
}

export const getCountryData = (country) => {
    return async (dispatch) => {
        try {

            if (country == 'United States of America') {
                country = 'US'
            }

            const res = await axios.get(`https://covid19.mathdro.id/api/countries/${country}`);

            let result = {
                countryConfirmed: res.data.confirmed,
                countryRecovered: res.data.recovered,
                countryDeaths: res.data.deaths,
                countryLastUpdate: res.data.lastUpdate
            }
            dispatch({
                type: GET_COUNTRY_DATA,
                payload: result
            })
            // dispatch(setAlert(`${country}: stats available`, 'success'))
        } catch (err) {

            dispatch({
                type: GET_COUNTRY_DATA,
                payload: null
            })
            let emoji = getRandomEmoji();
            dispatch(setAlert(`${country}: No stats data available ${emoji}`, 'danger'))
        }
    }
}

export const getMapData = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`https://covid19.mathdro.id/api/confirmed`);

            dispatch({
                type: GET_MAP_DATA,
                payload: res.data
            })
            // dispatch(setAlert('Map data available', 'success'))
        } catch (err) {
            dispatch({
                type: GET_MAP_DATA,
                payload: []
            })
            dispatch(setAlert('Map data not available', 'danger'))
        }
    }
}

export const getCountryInfo = (code) => {
    return async (dispatch) => {
        try {

            // if (country === 'Korea, South') {
            //     country = 'Korea (Republic of)'
            // }

            // const res = await axios.get(`https://restcountries.eu/rest/v2/name/${country}`);
            const res = await axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${code}`);

            dispatch({
                type: GET_COUNTRY_ADDITIONAL_INFO,
                payload: res.data
            })
            // dispatch(setAlert('Additional information available', 'success'))
        } catch (err) {

            let emoji = getRandomEmoji();
            dispatch(setAlert(` No Additional information available ${emoji}`, 'danger'))
        }
    }
}

export const getTimeSeriesData = (country) => {
    return async (dispatch) => {
        try {
            if (country == 'United States of America') {
                country = 'US'
            }
            const res = await axios.get(`https://pomber.github.io/covid19/timeseries.json`);
            let result = res.data[country].map(({ date, confirmed, recovered, deaths }) => {
                return {
                    date,
                    confirmed,
                    recovered,
                    deaths
                }
            }
            )
            dispatch({
                type: GET_TIMESERIES_DATA,
                payload: result
            })
            // dispatch(setAlert(`${country}: Timeseries data available`, 'success'))
        } catch (err) {
            dispatch({
                type: GET_TIMESERIES_DATA,
                payload: [{
                    date: 0,
                    confirmed: 0,
                    recovered: 0,
                    deaths: 0
                }
                ]
            })
            let emoji = getRandomEmoji();
            dispatch(setAlert(`${country} Timeseries data not available ${emoji}`, 'danger'))
        }
    }
}

export const getTimeSeriesDataCompare = (country) => {
    return async (dispatch) => {
        try {
            if (country == 'United States of America') {
                country = 'US'
            }
            const res = await axios.get(`https://pomber.github.io/covid19/timeseries.json`);
            let result = res.data[country].map(({ date, confirmed, recovered, deaths }) => {
                return {
                    date,
                    confirmed,
                    recovered,
                    deaths
                }
            }
            )
            dispatch({
                type: GET_TIMESERIES_DATA_COMPARE,
                payload: result
            })
            // dispatch(setAlert(`${country}: Timeseries data available`, 'success'))
        } catch (err) {
            dispatch({
                type: GET_TIMESERIES_DATA_COMPARE,
                payload: [{
                    date: 0,
                    confirmed: 0,
                    recovered: 0,
                    deaths: 0
                }
                ]
            })
            let emoji = getRandomEmoji();
            dispatch(setAlert(`${country} Timeseries data not available ${emoji}`, 'danger'))
        }
    }
}



//update selected country
export const countryUpdate = ({ prop, value }) => {
    return {
        type: COUNTRY_UPDATE,
        payload: { prop, value }
    };
};


export const getMapDataSouthAfrica = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('api/maps/south-africa');

            dispatch({
                type: GET_MAP_DATA_SOUTH_AFRICA,
                payload: res.data
            })
            // dispatch(setAlert('Map data available', 'success'))
        } catch (err) {
            dispatch({
                type: GET_MAP_DATA_SOUTH_AFRICA,
                payload: []
            })
            dispatch(setAlert('Map data not available', 'danger'))
        }
    }
}