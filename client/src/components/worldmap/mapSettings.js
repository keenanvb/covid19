
import { withLeaflet } from "react-leaflet";
import PrintControlDefault from 'react-leaflet-easyprint';
export const PrintControl = withLeaflet(PrintControlDefault);

export const baseMaps = [
    {
        name: 'OpenStreet Map',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        type: 'tile'
    },
    // {
    //     name: 'ArcGIS World Street Map',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    //     attribution: 'Esri',
    //     type: 'tile'
    // },
    // {
    //     name: 'ArcGIS World Topo Map',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    //     attribution: 'Esri',
    //     type: 'tile'
    // },
    {
        name: 'ArcGIS World Ocean Basemap',
        url: 'https://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri',
        type: 'tile'
    },
    // {
    //     name: 'ArcGIS World Ocean with Label',
    //     url: 'https://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
    //     attribution: '',
    //     type: 'tile'
    // },
    {
        name: 'ArcGIS National Geographic World Map',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri',
        type: 'tile'
    },
    {
        name: 'ArcGIS World Dark Gray Map',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri, DeLorme, HERE',
        type: 'tile',
        checked: true
    },
    // {
    //     name: 'ArcGIS World Dark Gray Map with Label',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    //     attribution: '',
    //     type: 'tile'
    // },
    {
        name: 'ArcGIS World Light Gray Map',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri, NAVTEQ, DeLorme',
        type: 'tile'
    },
    // {
    //     name: 'ArcGIS World Light Gray Map with Label',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    //     attribution: '',
    //     type: 'tile'
    // },
    {
        name: 'ArcGIS World Imagery',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
        type: 'tile'
    },
    // {
    //     name: 'ArcGIS World Imagery with Label',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    //     attribution: '',
    //     type: 'tile'
    // },
    // {
    //     name: 'ArcGIS World Transportation Map',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
    //     attribution: '',
    //     type: 'tile'
    // },
    // {
    //     name: 'ArcGIS World Shaded Relief Map',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
    //     attribution: 'Esri, NAVTEQ, DeLorme',
    //     type: 'tile'
    // },
    // {
    //     name: 'ArcGIS World Shaded Relief Map with Label',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
    //     attribution: '',
    //     type: 'tile'
    // },
    {
        name: 'ArcGIS World Terrain Map',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri, USGS, NOAA',
        type: 'tile'
    },
    // {
    //     name: 'ArcGIS World Terrain Map with Label',
    //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
    //     attribution: 'Esri, USGS, NOAA',
    //     type: 'tile'
    // },
    {
        name: 'ArcGIS World Imagery Clarity',
        url: 'https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
        type: 'tile'
    },
    {
        name: 'ArcGIS World Imagery Firefly',
        url: 'https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
        type: 'tile'
    },
    {
        name: 'ArcGIS World Physical Map',
        url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'U.S. National Park Service',
        type: 'tile'
    },
    // {
    //     name: 'Google Satellite',
    //     url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    //     attribution: '&copy; Google',
    //     type: 'tile'
    // },
    // {
    //     name: 'TMSmartmap',
    //     url: 'https://geosmart.selangor.gov.my/map/',
    //     attribution: 'Map data &copy; 2018 TM Geomatics Development &amp; Services',
    //     type: 'wms',
    //     layer: 'Malaysia:TMSmartmap',
    //     format: 'image/png'

    // },
];

export const downloadOptions = {
    position: 'topleft',
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    title: 'Export as PNG',
    hideControlContainer: false,
    exportOnly: true
};

export const printOptions = {
    position: 'topleft',
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    hideControlContainer: false
};


export const getColor = d => {
    return d > 10000 ? "#800026" : d > 5000 ? "#BD0026" : d > 2000 ? "#E31A1C" : d > 1000
        ? "#FC4E2A" : d > 500 ? "#FD8D3C" : d > 200 ? "#FEB24C" : d > 100 ? "#FED976" : "#FFEDA0";
};


export const getNumber = (title, area) => {
    const { confirmed, recovered, deaths } = area
    if (title.toLowerCase() == 'confirmed') {
        return confirmed
    } else if (title.toLowerCase() == 'recovered') {
        return recovered
    } else {
        return deaths
    }

}