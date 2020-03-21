import React, { useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Circle, Marker, InfoWindow } from 'react-google-maps'

const Maps = () => {

    const [selectedInfo, setSelectedInfo] = useState(null)

    const coords = { lat: 24.453884, lng: 54.377342 };
    const coords2 = { lat: 24.8437572, lng: 55.0275923 };

    const operatingTime = [
    ]

    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 24.453884, lng: 54.377342 }}
        >
            <Circle
                radius={10000}
                center={coords}
                // onMouseover={() => console.log('mouseover')}
                // onClick={() => console.log('click')}
                // onMouseout={() => console.log('mouseout')}
                fillOpacity={0.8}
                defaultOptions={{
                    fillColor: '#e67e22',
                    strokeColor: 'transparent',
                    strokeOpacity: 0,
                    strokeWeight: 5,
                    fillOpacity: 0.4
                }}
            />
            {operatingTime.map((info, index) => (
                <Marker
                    key={index}
                    position={{ lat: info.lat, lng: info.lng }}
                    onClick={() => {
                        setSelectedInfo(info)
                    }}
                />
            ))}

            {selectedInfo && (
                <InfoWindow position={{ lat: selectedInfo.lat, lng: selectedInfo.lng }}
                    onCloseClick={() => {
                        setSelectedInfo(null)
                    }}
                >
                    <div>
                        <h2>{selectedInfo.name}</h2>
                        <p>{selectedInfo.day}</p>
                        <p>{selectedInfo.time}</p>
                    </div>
                </InfoWindow>
            )
            }
            <Circle
                radius={1000}
                center={coords2}
                // onMouseover={() => console.log('mouseover')}
                // onClick={() => console.log('click')}
                // onMouseout={() => console.log('mouseout')}

                defaultOptions={{
                    fillColor: '#e67e22',
                    strokeColor: 'transparent',
                    strokeOpacity: 0,
                    strokeWeight: 5,
                    fillOpacity: 0.4
                }}

            />
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Maps));

export default WrappedMap;