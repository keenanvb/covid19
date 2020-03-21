import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Map, Marker, Popup, TileLayer, Circle, ZoomControl, Tooltip } from "react-leaflet";
import { Link } from 'react-router-dom'
import Legend from "./Legend";
// import { Icon } from "leaflet";
import L from "leaflet";
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import CountUp from 'react-countup';
import moment from 'moment'

import { getMapData } from '../../actions'

// export const icon = new Icon({
//     iconUrl: "👍",
//     iconSize: [100, 100]
// });
const WorldMap = ({ data: { mapData }, getMapData }) => {
    const [activeCountry, setActiveCountry] = useState(null);

    const [selectSort, setSelectSort] = useState('confirmed');

    let mapRef = useRef(null);


    // let setFillOpacity = (confirmed) => {
    //     if (confirmed < 2000) {
    //         return 0.4
    //     } else if (confirmed > 2000 && confirmed < 4000) {
    //         return 0.5
    //     } else if (confirmed > 4000 && confirmed < 8000) {
    //         return 0.6
    //     } else if (confirmed > 8000 && confirmed < 10000) {
    //         return 0.7
    //     } else {
    //         return 0.8
    //     }
    // }

    let setRadius = (confirmed) => {
        if (confirmed < 2000) {
            return 60000
        } else if (confirmed > 2000 && confirmed < 4000) {
            return 80000
        } else if (confirmed > 4000 && confirmed < 8000) {
            return 100000
        } else if (confirmed > 8000 && confirmed < 10000) {
            return 120000
        } else {
            return 140000
        }
    }

    let setFillColour = (confirmed) => {
        return confirmed > 10000 ? "#800026" : confirmed > 5000 ? "#BD0026" : confirmed > 2000
            ? "#E31A1C" : confirmed > 1000 ? "#FC4E2A" : confirmed > 500 ? "#FD8D3C" : confirmed > 200
                ? "#FEB24C" : confirmed > 100 ? "#FED976" : "#FFEDA0";
    }

    useEffect(() => {
        getMapData()
    }, [getMapData])


    const onCountryClick = (country) => {
        console.log('mapRef.current', mapRef.current)
        console.log('L', L);
        // console.log(map);
        //flyTo([13.87992, 45.9791], 12)
    }

    const [step, setStep] = useState(1);

    let displaySteps = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        {mapData.length > 0 ?
                            (
                                <Map ref={mapRef} center={[-18.4, 33.9]} zoom={2} animate={true} >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Legend />
                                    {mapData.map((country, index) => (
                                        // <Marker
                                        //     key={index}
                                        //     position={[
                                        //         country.lat,
                                        //         country.long
                                        //     ]}
                                        //     onClick={() => {
                                        //         setActiveCountry(country);
                                        //     }}
                                        //     icon={icon}
                                        // >
                                        <Circle //Marker
                                            key={index}
                                            center={[ // position
                                                country.lat,
                                                country.long
                                            ]}

                                            // radius={85000}
                                            radius={setRadius(country.confirmed)}
                                            fillColor={setFillColour(country.confirmed)}
                                            // fillColor={'#f03'}
                                            weight={0}
                                            fillOpacity={0.8}
                                            // fillOpacity={setFillOpacity(country.confirmed)}
                                            onClick={() => {
                                                setActiveCountry(country);
                                            }} >
                                            <Tooltip>{country.countryRegion} {country.provinceState ? <span>{country.provinceState}</span> : null}</Tooltip>
                                        </Circle>

                                        // </Marker>
                                    ))}

                                    {activeCountry && (
                                        <Popup
                                            position={[
                                                activeCountry.lat,
                                                activeCountry.long
                                            ]}
                                            onClose={() => {
                                                setActiveCountry(null);
                                            }}
                                        >
                                            <div>
                                                <h2>{activeCountry.countryRegion}</h2>
                                                {activeCountry.provinceState ? <span>{activeCountry.provinceState}</span> : null}
                                                <p className="">last update: {moment(activeCountry.lastUpdate).format('DD/MM/YY hh:mm:ss a')}</p>
                                                <p className="confirmed">Confirmed: {activeCountry.confirmed}</p>
                                                <p className="recovered">Recovered: {activeCountry.recovered}</p>
                                                <p className="deaths">Deaths: {activeCountry.deaths}</p>
                                            </div>
                                        </Popup>
                                    )}
                                </Map>
                            ) :
                            <Spinner />
                        }</>
                    // <Goal goals={profile.goals} prevStep={prevStep} nextStep={nextStep} />
                )
            case 2:
                return (
                    <>
                        {mapData.length > 0 ?
                            (<>
                                <>SORT BY</>
                                <div className="filter-buttons">
                                    {filterList.map((filter, index) => {
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
                                <div className="country-list-container">

                                    {renderList()}
                                </div>
                            </>) :
                            <Spinner />
                        }
                    </>
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    let filterList = ['confirmed', 'recovered', 'deaths', 'lastUpdate'];

    const renderList = () => {

        let sortedData = mapData.sort((x, y) => {
            console.log('x.selectSort', x[selectSort]);

            return x[selectSort] > y[selectSort] ? 1 : -1
        });

        console.log('sortedData', sortedData);

        let data = mapData.sort((x, y) => {
            return x[selectSort] < y[selectSort] ? 1 : -1
        }).map((country, index) => {
            return (
                <div key={index} className="country-list" onClick={() => {
                    onCountryClick(country)
                }}>
                    <div>{country.countryRegion} {country.provinceState}</div>
                    <div className="confirmed" ><CountUp separator=',' delay={1} duration={3} end={country.confirmed} /></div>
                    <div className="recovered" ><CountUp separator=',' delay={1} duration={3} end={country.recovered} /></div>
                    <div className="deaths" ><CountUp separator=',' delay={1} duration={3} end={country.deaths} /></div>
                    <div>{moment(country.lastUpdate).format('DD/MM/YY hh:mm:ss a')}</div>
                </div>
            )
        })

        return data
    }

    return (
        <div className="world-map-container">
            <div className="dash-buttons">
                <div onClick={() => {
                    setStep(1);
                }} className="btn btn-light"> Map View</div>
                <div onClick={() => {
                    setStep(2);
                }} className="btn btn-light"> Table View</div>
            </div>
            {displaySteps()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, { getMapData })(WorldMap)