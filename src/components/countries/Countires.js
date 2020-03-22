import React, { useState } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import moment from 'moment'

const Countries = ({ currentCountry, data: { mapData } }) => {

    const [selectSort, setSelectSort] = useState('confirmed');
    const [direction, setDirection] = useState(true)

    let filterList = ['confirmed', 'recovered', 'deaths', 'lastUpdate', 'direction'];

    const renderList = () => {
        let data = currentCountry.sort((x, y) => {
            if (direction) {
                return x[selectSort] < y[selectSort] ? 1 : -1
            } else {
                return x[selectSort] > y[selectSort] ? 1 : -1
            }

        }).map((country, index) => {
            return (
                <div key={index} className="country-list" >
                    <div>{country.countryRegion} {country.provinceState}</div>
                    <div className="confirmed" >{country.confirmed}</div>
                    <div className="recovered" >{country.recovered}</div>
                    <div className="deaths" >{country.deaths}</div>
                    <div>{moment(country.lastUpdate).format('DD/MM/YY hh:mm:ss')}</div>
                </div>
            )
        });

        return data
    }

    return (
        <div>

            {currentCountry.length > 0 ?
                (<>
                    <>SORT BY</>
                    <div className="filter-buttons">
                        {filterList.map((filter, index) => {

                            if (filter === 'direction') {
                                return (
                                    <div onClick={() => {
                                        setDirection(!direction);
                                    }} className={`btn btn-light ${filter}-left`}>{direction === true ? 'Desc' : 'Asc'}</div>
                                )
                            }

                            if (filter === selectSort) {
                                return (
                                    <div onClick={() => {
                                        setSelectSort(`${filter}`);
                                    }} className={`btn btn-light ${filter}-left activeFilter`}>{filter.toLowerCase()}</div>
                                )
                            } else {
                                return (
                                    <div onClick={() => {
                                        setSelectSort(`${filter}`);
                                    }} className={`btn btn-light ${filter}-left`}>{filter.toLowerCase()}</div>
                                )
                            }
                        })}

                        {/* <div onClick={() => {
                                        setSelectSort('confirmed');
                                    }} className="btn btn-light confirmed-left">Confirmed</div>
                                    <div onClick={() => {
                                        setSelectSort('recovered');
                                    }} className="btn btn-light recovered-left">Recovered</div>
                                    <div onClick={() => {
                                        setSelectSort('deaths');
                                    }} className="btn btn-light deaths-left">Death</div>
                                    <div onClick={() => {
                                        setSelectSort('lastUpdate');
                                    }} className="btn btn-light lastUpdate-left">Last updated</div> */}
                    </div>
                    <div className="country-list-heading">
                        <div>Area</div>
                        <div className="confirmed">Confirmed</div>
                        <div className="recovered">Recovered</div>
                        <div className="deaths">Deaths</div>
                        <div>Updated</div>
                    </div>
                    <div className="country-list-container">

                        {renderList()}
                    </div>
                </>) :
                <Spinner />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, {})(Countries)