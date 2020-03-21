import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getData } from '../../actions'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import Dropdown from './Dropdown'
import moment from 'moment'
import CountUp from 'react-countup';

const Landing = ({ data: { data,
    countryData, loading, countryAdditionalInfo, selectedCountry }, countries, getData }) => {
    useEffect(() => {
        getData()
    }, [getData])

    const [checked, setChecked] = useState(false)

    let displayGlobalStats = () => {
        return (
            <div className="stats-container">
                <h2>Global Statistics</h2>
                <span>last updated {moment(data.lastUpdate).format('DD-MM-YY hh:mm:ss a')}</span>
                <div className="status-block">
                    <div className="stats-status">
                        <h3>Confirmed</h3>
                        <div className="confirmed"><CountUp separator=',' delay={1} duration={3} end={data.confirmed.value} /></div>
                    </div>
                    <div className="stats-status">
                        <h3>Recovered</h3>
                        <div className="recovered"><CountUp separator=',' delay={1} duration={3} end={data.recovered.value} />  </div>
                    </div>
                    <div className="stats-status">
                        <h3>Deaths</h3>
                        <div className="deaths"><CountUp separator=',' delay={1} duration={3} end={data.deaths.value} />  </div>
                    </div>
                </div>
            </div>
        )
    }

    let displayCountryStats = () => {
        return (
            <div className="stats-container">
                <span>last updated {moment(countryData.lastUpdate).format('DD-MM-YY hh:mm:ss a')}</span>
                <div className="status-block">
                    <div className="stats-status">
                        <h3>Confirmed</h3>
                        <div className="confirmed" ><CountUp separator=',' end={countryData.countryConfirmed.value} /></div>
                    </div>
                    <div className="stats-status">
                        <h3>Recovered</h3>
                        <div className="recovered"><CountUp separator=',' end={countryData.countryRecovered.value} /></div>
                    </div>
                    <div className="stats-status">
                        <h3>Deaths</h3>
                        <div className="deaths"><CountUp separator=',' end={countryData.countryDeaths.value} /></div>
                    </div>
                </div >
            </div >
        )
    }

    let displayCountryAdditionalInfo = () => {
        let countryInfo = countryAdditionalInfo[0]
        console.log('countryInfo', countryInfo);
        return (
            <div className="stats-container">
                {/* <h2>Global Statistics</h2> */}
                <span>{countryInfo.name}</span>
                <div className="status-block status-wrap">
                    <div className="stats-status">
                        <h3>{}</h3>
                        <div className="deaths">   <img className="flag-image-medium"
                            src={`${countryInfo.flag}`}
                            alt="new"
                        /></div>
                    </div>
                    <div className="stats-status">
                        <h3>Capital</h3>
                        <div className="confirmed">{countryInfo.capital}</div>
                    </div>
                    <div className="stats-status">
                        <h3>Population</h3>
                        <div className="recovered"><CountUp separator=',' delay={1} duration={3} end={countryInfo.population} />  </div>
                    </div>
                    <div className="stats-status">
                        <h3>Languages</h3>
                        <div>{countryInfo.languages.map((language) => `${language.name} `)}</div>
                    </div>
                    <div className="stats-status">
                        <h3>Region</h3>
                        <div>{countryInfo.region}</div>
                    </div>
                    <div className="stats-status">
                        <h3>Travel</h3>
                        <div>   <a target='_blank' href={`https://www.google.com/maps?q=${countryInfo.latlng[0]},${countryInfo.latlng[1]}&z=200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" /><circle cx="12" cy="9" r="2.5" /></svg>
                        </a></div>
                    </div>
                    <div className="stats-status">
                        <h3>Subregion</h3>
                        <div>{countryInfo.subregion}</div>
                    </div>
                </div>
            </div>
        )
    }

    let displayEmptyStats = () => {
        return (
            <div className="stats-container">
                <div className="status-block">
                    <div className="stats-status">
                        <h3>Confirmed</h3>
                        <div className="confirmed" >0</div>
                    </div>
                    <div className="stats-status">
                        <h3>Recovered</h3>
                        <div className="recovered">0</div>
                    </div>
                    <div className="stats-status">
                        <h3>Deaths</h3>
                        <div className="deaths">0</div>
                    </div>
                </div >
            </div >
        )
    }

    return (
        <div className="container">
            {data == null ? <Spinner /> :
                (displayGlobalStats())
            }
            <Dropdown title={selectedCountry || 'Please select a country'} dropdownData={countries} type='landing' />
            {countryData == null ? displayEmptyStats() : displayCountryStats()}
            <div className="stats-container">
                <div>Additional Country Information {countryAdditionalInfo ? 'Available' : 'Not Available'}</div>
                <input style={{ margin: '0px auto' }} type="checkbox" name="check" checked={checked} onChange={() => { setChecked(!checked) }} />
            </div>
            {checked && countryAdditionalInfo ? displayCountryAdditionalInfo() : null}

        </div>
    )
}

Landing.propTypes = {
    data: PropTypes.object
}


const mapStateToProps = state => {
    return {
        data: state.data,
        countries: state.countries
    }
};

export default connect(mapStateToProps, { getData })(Landing)


