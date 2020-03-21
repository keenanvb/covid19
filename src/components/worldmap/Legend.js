import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const Legend = () => {
    const { map } = useLeaflet();
    console.log(map);

    useEffect(() => {
        const getColor = d => {
            return d > 10000
                ? "#800026"
                : d > 5000
                    ? "#BD0026"
                    : d > 2000
                        ? "#E31A1C"
                        : d > 1000
                            ? "#FC4E2A"
                            : d > 500
                                ? "#FD8D3C"
                                : d > 200
                                    ? "#FEB24C"
                                    : d > 100
                                        ? "#FED976"
                                        : "#FFEDA0";
        };

        const legend = L.control({ position: "bottomright" });

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            const grades = [0, 100, 200, 500, 1000, 2000, 5000, 10000];
            let labels = [];
            let from;
            let to;
            labels.push('<h3>Confirmed Cases</h3>')
            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                    '<i style="background:' +
                    getColor(from + 1) +
                    '"></i> ' +
                    from +
                    (to ? "&ndash;" + to : "+")
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
