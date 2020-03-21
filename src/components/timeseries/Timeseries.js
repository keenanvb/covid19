import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Dropdown from '../layout/Dropdown'
import { getTimeSeriesData, countryUpdate } from '../../actions'
import {
    AreaChart, XAxis, YAxis, CartesianGrid, Tooltip,
    Area, LineChart, Legend, Line, ResponsiveContainer
} from 'recharts'
import Spinner from '../layout/Spinner'

const Timeseries = ({ data: { timeseriesData, selectedCountryGraph }, countries }) => {

    useEffect(() => {

    }, [])

    // let selectedItem = (title) => {
    //     // setFormData({
    //     //     ...formData, title: `${title}`
    //     // });
    //     console.log('title', title)
    //     countryUpdate({ prop: 'selectedCountry', value: title })
    //     // getCountryData(selectedCountry);
    // }

    return (
        <div className="timeseries-container">
            <Dropdown title={selectedCountryGraph || 'Please select a country'} dropdownData={countries} type='timeseries' />
            {timeseriesData.length > 0 ?
                // <div style={{ position: 'relative', width: '100%', height: '100%', paddingBottom: '250px' }}>
                //     <div
                //         style={{
                //             position: 'absolute',
                //             left: 0,
                //             right: 0,
                //             bottom: 0,
                //             top: 0,
                //         }}
                //     >
                <>
                    <h3 style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>{selectedCountryGraph}</h3>
                    <ResponsiveContainer width="100%" height={650}>
                        <AreaChart data={timeseriesData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 250 }}>
                            <defs>
                                <linearGradient id="confirmed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#27ae60" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#27ae60" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#c0392b" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#c0392b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip
                                wrapperStyle={{ backgroundColor: "red" }}
                            />
                            <Area type="monotone" dataKey="confirmed" stroke="#f39c12" fillOpacity={1} fill="url(#confirmed)" />
                            <Area type="monotone" dataKey="recovered" stroke="#27ae60" fillOpacity={1} fill="url(#recovered)" />
                            <Area type="monotone" dataKey="deaths" stroke="#c0392b" fillOpacity={1} fill="url(#deaths)" />
                            <Legend style={{ marginTop: '60px' }} height={42} />
                        </AreaChart>
                    </ResponsiveContainer>
                </>
                : <Spinner />
            }
            {/* <div style={{ position: 'relative', width: '100%', height: '100%', paddingBottom: '250px' }}>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    }}
                >
                    {timeseriesData.length > 0 ?
                        <>
                            <h3 style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>{selectedCountryGraph}</h3>
                            <ResponsiveContainer>
                                <LineChart data={timeseriesData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis style={{ color: 'white' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="confirmed" stroke="#f39c12" />
                                    <Line type="monotone" dataKey="recovered" stroke="#27ae60" />
                                    <Line type="monotone" dataKey="deaths" stroke="#c0392b" />
                                    <Legend style={{ marginTop: '20px' }} height={42} />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                        : <Spinner />
                    }

                </div>
            </div> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        countries: state.countries
    }
}


export default connect(mapStateToProps, { getTimeSeriesData, countryUpdate })(Timeseries)