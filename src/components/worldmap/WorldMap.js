import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Map, Marker, Popup, TileLayer, Circle, ZoomControl, Tooltip } from "react-leaflet";
import { Link } from 'react-router-dom'
import Legend from "./Legend";
// import { Icon } from "leaflet";
// import L from "leaflet";
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import moment from 'moment'
import Countires from '../countries/Countires'
import Pagination from '../countries/Pagination'
import { getMapData } from '../../actions'

const WorldMap = ({ data: { mapData }, getMapData }) => {
    const [activeCountry, setActiveCountry] = useState(null);

    const [selectSort, setSelectSort] = useState('confirmed');

    let mapRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(20);
    const [activePagination, setActivePagination] = useState(1)

    //Get current countries
    const indexofLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexofLastCountry - countriesPerPage;
    const currentCountry = mapData.slice(indexOfFirstCountry, indexofLastCountry)

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                )
            case 2:
                console.log('currentCountry', currentCountry);
                return (
                    <>
                        <Countires currentCountry={currentCountry} />
                        <Pagination countriesPerPage={countriesPerPage} allCountries={mapData.length}
                            paginate={paginate} activePagination={activePagination} setActivePagination={setActivePagination} />
                    </>
                )
            default:
                return (
                    <div></div>
                )
        }
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