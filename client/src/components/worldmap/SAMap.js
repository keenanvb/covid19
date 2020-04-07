import React, { useState, useEffect, useRef } from 'react';
import { Map, Popup, TileLayer, Circle, Tooltip, WMSTileLayer, LayersControl, FeatureGroup, GeoJSON } from "react-leaflet";
import { PrintControl, baseMaps, downloadOptions, printOptions, getColor } from './mapSettings'
import Control from 'react-leaflet-control';
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getMapDataSouthAfrica } from '../../actions'
import ReactGA from 'react-ga'
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'
import sageojson from './south-africa-geo.json'
import L from "leaflet";
import { LocationIcon, GridIcon, CircleIcon } from '../../icons'

const SAMap = ({ data: { mapData, southAfricaData }, getMapDataSouthAfrica }) => {

    let mapRef = useRef(null);
    const [activeCountry, setActiveCountry] = useState(null);
    const [showLegend, setShowLegend] = useState(true);
    const [showTop5, setShowTop5] = useState(false);
    const [showDiffMap, setDiffMap] = useState(true);
    // const [selected, setSelected] = useState({}); // mobile not working for touch

    useEffect(() => {
        getMapDataSouthAfrica()
        ReactGA.pageview(window.location.pathname);
    }, [])

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

    const sortProvinces = () => {
        let top5array = []
        Object.keys(southAfricaData).map((provice, index) => {
            let data = southAfricaData[provice];
            if (data.info !== undefined) {
                let count = parseInt(data.mapProvinceCount.count)
                let { provinceFullName, position } = data.info;
                top5array.push({
                    provinceFullName, count, position, info: data.info, data
                })
            }
        })

        let top5sort = top5array.sort((x, y) => {
            return x.count < y.count ? 1 : -1
        });

        return top5sort.slice(0, 5)
    }

    let getTotalConfirmedCases = () => {
        let total = 0;
        Object.keys(southAfricaData).map((provice, index) => {
            let data = southAfricaData[provice];
            if (data.info !== undefined) {
                let count = parseInt(data.mapProvinceCount.count)
                total += count
            }
        })

        return total
    }

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
        if (confirmed < 100) {
            return 40000
        } else if (confirmed > 100 && confirmed < 200) {
            return 60000
        } else if (confirmed > 200 && confirmed < 500) {
            return 80000
        } else if (confirmed > 500 && confirmed < 1000) {
            return 100000
        } else {
            return 120000
        }
    }

    let setFillColour = (confirmed) => {
        return confirmed > 100000 ? "#800026" : confirmed > 5000 ? "#BD0026" : confirmed > 2000
            ? "#E31A1C" : confirmed > 1000 ? "#FC4E2A" : confirmed > 500 ? "#FD8D3C" : confirmed > 200
                ? "#FEB24C" : confirmed > 100 ? "#FED976" : "#FFEDA0";
    }

    let displayTop5 = (e) => {
        let provices = sortProvinces()

        return (
            <Control position="bottomleft" >
                <div className="info top5">
                    <h3>Top 5</h3>
                    {provices.map((provice, index) => {
                        const { position, provinceFullName, count, data } = provice
                        return (
                            <div style={{ marginTop: '10px' }} className="top5-row" onClick={() => {
                                const map = mapRef.current.leafletElement
                                // map.setView([-30.00, 25.00], 6)
                                // map.setView([position[0], position[1]], map.getZoom(), {
                                //     "animate": true,
                                //     "pan": {
                                //         "duration": 2
                                //     }
                                // });
                                // map.setView([position[0], position[1]], 7, {
                                //     "animate": true,
                                //     "pan": {
                                //         "duration": 2
                                //     }
                                // });
                                map.flyTo([position[0], position[1]], 8, {
                                    "animate": true,
                                    "pan": {
                                        "duration": 8
                                    }
                                })
                                setActiveCountry(data);
                            }}>
                                <div> {`${index + 1} ${provinceFullName}`}</div>
                                <div className="top5-count">{`${count}`}</div>
                            </div>
                        )
                    })}
                </div>
            </Control>
        )
    }

    const resetHighlight = (e) => {
        let provinceAbbreviation = e.target.feature.properties.SHORT
        const provinceData = southAfricaData[provinceAbbreviation]
        let layer = e.target;
        // setSelected({});
        layer.setStyle({
            weight: 2,
            color: provinceData ? setFillColour(provinceData.mapProvinceCount.count) : 'black',
            dashArray: "",
            opacity: 1,
            fillOpacity: 0.8
        });
    }

    const highlightFeature = (e) => {
        var layer = e.target;
        const { NAME, NAME2 } = e.target.feature.properties;
        let provinceAbbreviation = e.target.feature.properties.SHORT
        const provinceData = southAfricaData[provinceAbbreviation]

        // setSelected({
        //     province: `${NAME}, ${NAME2}`,
        //     count: provinceData.mapProvinceCount.count
        // });

        layer.setStyle({
            weight: 2,
            dashArray: "1",
            fillOpacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    const zoomToFeature = (e) => {
        const map = mapRef.current.leafletElement
        map.fitBounds(e.target.getBounds());
    }

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.NAME2) {
            let province = feature.properties.NAME2;
            let provinceAbbreviation = feature.properties.SHORT
            const provinceData = southAfricaData[provinceAbbreviation]

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });


            layer.setStyle({
                weight: 2,
                color: provinceData ? setFillColour(provinceData.mapProvinceCount.count) : 'black',
                dashArray: "3",
                opacity: 1,
                fillOpacity: 0.8
            });

            layer.bindTooltip(`
                <div>
                    <h3 >
                        ${province}
                    </h3>
                    <div >
                    Cases: ${provinceData.mapProvinceCount.count}
                    </div>
                </div>
            `);
        }
    }

    let displayLegend = () => {
        const grades = [0, 100, 200, 500, 1000, 2000, 5000, 10000];
        let from;
        let to;

        return (
            <Control position="bottomright" >
                <div className="info legend">
                    <h3>Cases</h3>
                    {grades.map((grade, index) => {
                        from = grades[index];
                        to = grades[index + 1];

                        return (<div key={{ index }}><i style={{ background: `${getColor(from + 1)}` }}></i>{`${from}`}{`${(to) ? `-${to}` : '+'}`} </div>)
                    })}
                </div>
            </Control>
        )
    }

    return (

        <div className="world-map-container">
            {southAfricaData !== null ?
                (
                    <Map ref={mapRef} center={[-30.00, 25.00]} zoom={5} animate={true}>
                        {/* <Control position="topright" >
                            <button
                                onClick={() => setShowLegend(!showLegend)}
                            >
                                {showLegend ? 'Hide Legend' : 'Show Legend'}
                            </button>
                        </Control> */}
                        {/* {!selected.province && (
                            <div className="south-africa-hover-info"><strong>Hover over an Area</strong></div>
                        )}
                        {selected.province && (
                            <div className="south-africa-info">
                                <strong>{selected.province}</strong>
                                <span>{` ${selected.count}`}</span>
                            </div>
                        )} */}
                        <Control position="topright" >
                            <button
                                onClick={() => setDiffMap(!showDiffMap)}
                            >
                                {showDiffMap ? <GridIcon /> : <CircleIcon />}
                            </button>
                            <button
                                onClick={() => {
                                    const map = mapRef.current.leafletElement
                                    map.flyTo([-30.00, 25.00], 5, {
                                        "animate": true,
                                        "pan": {
                                            "duration": 8
                                        }
                                    })
                                }}
                            ><LocationIcon /></button>
                        </Control>
                        <Control position="topright" >
                            <button
                                onClick={() => setShowTop5(!showTop5)}
                            >
                                {showTop5 ? 'Hide Top 5' : 'Show Top 5'}
                            </button>
                        </Control>
                        {showTop5 ? displayTop5() : null}
                        {showLegend ? displayLegend() : null}
                        {renderBaseLayerControl()}
                        {/* <Control position="bottomleft" >
                            <div className="info total">
                                <h3>{`Confirmed Cases: ${getTotalConfirmedCases()}`}</h3>
                            </div>
                        </Control> */}
                        <FullscreenControl position="topleft" />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {showDiffMap ?

                            <>{Object.keys(southAfricaData).map((provice, index) => {
                                let data = southAfricaData[provice];
                                if (data.info !== undefined) {
                                    let count = parseInt(data.mapProvinceCount.count);
                                    let { provinceFullName, position } = data.info;
                                    return (
                                        <Circle //Marker
                                            key={index}
                                            center={[ // position
                                                position[0],
                                                position[1]
                                            ]}

                                            // radius={85000}
                                            radius={setRadius(count)}
                                            fillColor={setFillColour(count)}
                                            // fillColor={'#f03'}
                                            weight={0}
                                            fillOpacity={0.6}
                                            // fillOpacity={setFillOpacity(country.confirmed)}
                                            onClick={() => {
                                                setActiveCountry(data);
                                            }} >
                                            <Tooltip>
                                                <p>{provinceFullName}</p>
                                            </Tooltip>
                                        </Circle>
                                    )
                                } else {
                                    return null
                                }
                            })}
                                {activeCountry && (
                                    <Popup
                                        position={[
                                            activeCountry.info.position[0],
                                            activeCountry.info.position[1]
                                        ]}
                                        onClose={() => {
                                            setActiveCountry(null);
                                        }}
                                    >
                                        <div>
                                            <h2>{activeCountry.info.provinceFullName}</h2>
                                            <h2>{activeCountry.mapProvinceCount.count}</h2>
                                        </div>
                                    </Popup>
                                )}</> :
                            <GeoJSON data={sageojson} onEachFeature={onEachFeature} />
                        }
                        {/* <PrintControl  {...printOptions} /> */}
                        <PrintControl {...downloadOptions} />

                    </Map>
                ) :
                <Spinner />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, { getMapDataSouthAfrica })(SAMap)