import React, { useState, useEffect, useRef } from 'react';
import { Map, Popup, TileLayer, Circle, Tooltip, WMSTileLayer, LayersControl, FeatureGroup } from "react-leaflet";
import { PrintControl, baseMaps, downloadOptions, printOptions, getColor, getNumber } from './mapSettings'
import Control from 'react-leaflet-control';
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import moment from 'moment'
import Countires from '../countries/Countires'
import Pagination from '../countries/Pagination'
import { getMapData } from '../../actions'
import ReactGA from 'react-ga'
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'

const WorldMap = ({ data: { mapData }, getMapData }) => {
    let mapRef = useRef(null);
    const [step, setStep] = useState(1);
    const [activeCountry, setActiveCountry] = useState(null);
    const [showLegend, setShowLegend] = useState(true);
    const [showTop5, setShowTop5] = useState(false);


    useEffect(() => {
        getMapData()
        ReactGA.pageview(window.location.pathname);
    }, [])

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

    let renderBaseLayerControl = () => {
        return (
            <LayersControl position="topright">
                {baseMaps.map(({ name, url, attribution, type, layer, format, checked = false }) => {
                    return name === 'OpenStreet Map' ? (
                        <LayersControl.BaseLayer key={name} name={name} checked={checked} >
                            <WMSTileLayer
                                layers={layer}
                                format={format}
                                transparent={false}
                                url={url}
                                attribution={attribution}
                            />
                        </LayersControl.BaseLayer>
                    ) : (
                            <LayersControl.BaseLayer key={name} name={name} checked={checked} >
                                <TileLayer
                                    attribution={attribution}
                                    url={url}
                                />
                            </LayersControl.BaseLayer>
                        );
                })}
                <LayersControl.BaseLayer name="ImageryLabels" >
                    <FeatureGroup>
                        <TileLayer
                            attribution="Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community"
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                        <TileLayer
                            attribution=""
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        />
                        <TileLayer
                            attribution=""
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                        />
                    </FeatureGroup>
                </LayersControl.BaseLayer>
            </LayersControl>
        );
    }

    const sortCountries = (sort) => {
        let data = mapData.sort((x, y) => {
            return x[sort] < y[sort] ? 1 : -1
        });

        return data.slice(0, 5)
    }

    let displayLegend = () => {
        const grades = [0, 100, 200, 500, 1000, 2000, 5000, 10000];
        let from;
        let to;

        return (
            <Control position="bottomright" >
                <div className="info legend">
                    <h3>Confirmed Cases</h3>
                    {grades.map((grade, index) => {
                        from = grades[index];
                        to = grades[index + 1];

                        return (<div key={{ index }}><i style={{ background: `${getColor(from + 1)}` }}></i>{`${from}`}{`${(to) ? `-${to}` : '+'}`} </div>)
                    })}
                </div>
            </Control>
        )
    }


    let displayTop5 = (countries, title) => {
        return (
            <Control position="bottomleft" >
                <div className="info top5">
                    <h3>{`Top 5 ${title}`}</h3>
                    {countries.map((country, index) => {
                        let number = getNumber(title, country)
                        const { lat, long, combinedKey } = country
                        let activeCountry = country
                        return (<div className="top5-row"
                            onClick={() => {

                                const map = mapRef.current.leafletElement
                                // map.setView([lat, long], 4, {
                                //     "animate": true,
                                //     "pan": {
                                //         "duration": 4
                                //     }
                                // });
                                map.flyTo([lat, long], 8, {
                                    "animate": true,
                                    "pan": {
                                        "duration": 8
                                    }
                                })
                                setTimeout(() => {
                                    setActiveCountry(activeCountry);
                                }, 2000)
                            }}
                            key={{ index }} style={{ marginTop: '10px' }}>{index + 1} {combinedKey} {number}</div>)
                    })}
                </div>
            </Control>
        )
    }


    let setRadius = (country) => {
        const { deaths, countryRegion } = country
        if (countryRegion.toLowerCase() == 'us') {

            if (deaths < 2000) {
                return 10000
            } else if (deaths > 2000 && deaths < 4000) {
                return 20000
            } else if (deaths > 4000 && deaths < 8000) {
                return 40000
            } else if (deaths > 8000 && deaths < 10000) {
                return 80000
            } else {
                return 100000
            }
        } else {
            if (deaths < 2000) {
                return 60000
            } else if (deaths > 2000 && deaths < 4000) {
                return 80000
            } else if (deaths > 4000 && deaths < 8000) {
                return 100000
            } else if (deaths > 8000 && deaths < 10000) {
                return 120000
            } else {
                return 140000
            }
        }
    }

    let setFillColour = (confirmed) => {
        return confirmed > 100000 ? "#800026" : confirmed > 5000 ? "#BD0026" : confirmed > 2000
            ? "#E31A1C" : confirmed > 1000 ? "#FC4E2A" : confirmed > 500 ? "#FD8D3C" : confirmed > 200
                ? "#FEB24C" : confirmed > 100 ? "#FED976" : "#FFEDA0";
    }


    let displaySteps = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        {mapData.length > 0 ?
                            (
                                <Map ref={mapRef} center={[-22.93, 30.55]} zoom={3} animate={true} >
                                    <FullscreenControl position="topleft" />
                                    <Control position="topright" >
                                        <button
                                            onClick={() => setShowTop5(!showTop5)}
                                        >
                                            {showTop5 ? 'Hide Top 5' : 'Show Top 5'}
                                        </button>
                                        <button
                                            onClick={() => setShowLegend(!showLegend)}
                                        >
                                            {showLegend ? 'Hide Legend' : 'Show Legend'}
                                        </button>
                                    </Control>
                                    {renderBaseLayerControl()}
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {showLegend ? displayLegend() : null}
                                    {/* <Top5 countries={sortCountries('deaths')} title={'Deaths'} /> //removed */}
                                    {showTop5 ?
                                        displayTop5(sortCountries('deaths'), 'Deaths') : null}
                                    {showTop5 ?
                                        displayTop5(sortCountries('recovered'), 'Recovered') : null}
                                    {showTop5 ?
                                        displayTop5(sortCountries('confirmed'), 'Confirmed') : null}
                                    {mapData.map((country, index) => {
                                        if (country.lat && country.long) {
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
                                            return (<Circle //Marker
                                                key={index}
                                                center={[ // position
                                                    country.lat,
                                                    country.long
                                                ]}

                                                // radius={85000}
                                                radius={setRadius(country)}
                                                fillColor={setFillColour(country.confirmed)}
                                                // fillColor={'#f03'}
                                                weight={0}
                                                fillOpacity={0.8}
                                                // fillOpacity={setFillOpacity(country.confirmed)}
                                                onClick={() => {
                                                    setActiveCountry(country);
                                                }} >
                                                <Tooltip>
                                                    <p>{country.combinedKey}</p>
                                                </Tooltip>
                                            </Circle>)

                                            // </Marker>
                                        }

                                    })}

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
                                                {/* <h2>{activeCountry.countryRegion}</h2> */}
                                                <h2>{activeCountry.combinedKey}</h2>
                                                <p className="">last update: {moment(activeCountry.lastUpdate).format('DD/MM/YY hh:mm:ss a')}</p>
                                                <p className="confirmed">Confirmed: {activeCountry.confirmed}</p>
                                                <p className="active">Active: {activeCountry.active}</p>
                                                <p className="recovered">Recovered: {activeCountry.recovered}</p>
                                                <p className="deaths">Deaths: {activeCountry.deaths}</p>
                                                {/* <p className="">People Tested: {activeCountry.peopleTested ? activeCountry.peopleTested : 'Info not available'}</p>
                                                <p className="">Incident Rate: {activeCountry.incidentRate ? activeCountry.peopleTested : 'Info not available'}</p> */}
                                            </div>
                                        </Popup>
                                    )}
                                    {/* <PrintControl  {...printOptions} /> */}
                                    <PrintControl {...downloadOptions} />
                                </Map>
                            ) :
                            <Spinner />
                        }</>
                )
            case 2:
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
            {/* <div className="dash-buttons">
                <div onClick={() => {
                    setStep(1);
                    ReactGA.event({
                        category: 'Button',
                        action: 'clicked for map view'
                    })
                }} className="btn btn-light"> Map View</div>
                <div onClick={() => {
                    setStep(2);
                    ReactGA.event({
                        category: 'Button',
                        action: 'clicked for countries'
                    })
                }} className="btn btn-light"> Table View</div>
            </div> */}
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