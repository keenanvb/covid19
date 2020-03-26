import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const Legend = ({ countries, title }) => {

    const getColor = d => {
        if (d.toLowerCase() == 'confirmed') {
            return 'orange'
        } else if (d.toLowerCase() == 'recovered') {
            return 'green'
        } else {
            return 'red'
        }
    };

    const getNumber = (title, area) => {
        const { confirmed, recovered, deaths } = area
        if (title.toLowerCase() == 'confirmed') {
            return confirmed
        } else if (title.toLowerCase() == 'recovered') {
            return recovered
        } else {
            return deaths
        }

    }

    const { map } = useLeaflet();
    useEffect(() => {
        const legend = L.control({ position: "bottomleft" });
        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info top5");
            let labels = [];
            labels.push(`<h3>Top 5 Country ${title}</h3>`)
            for (let i = 0; i < countries.length; i++) {
                let area = countries[i];
                let num = i + 1
                labels.push(
                    '<i style="backgroundColor:' +
                    getColor(title) +
                    '"></i> ' +
                    `<p>${num} ${area.combinedKey} ${getNumber(title, area)}</p>`
                );
            }
            div.innerHTML = labels.join("<br>");
            return div;
        };

        legend.addTo(map);
    }, []);
    return null;
};

export default Legend;
