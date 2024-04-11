import { hoc } from "@/utils";
import { useProhibitedAreasProps } from "./prohibited-areas.props";
import {useEffect, useState} from 'react';
export const ProhibitedAreas = hoc(useProhibitedAreasProps, ({ data }) => {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);
  useEffect(() => {
    // Load Yandex Maps API script dynamically
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=d0d839ee-df20-4ff8-8560-0accbae24c38&lang=en_US";
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    // Cleanup: remove the dynamically added script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const initializeMap = () => {
    ymaps.ready(() => {
      const mapInstance = new ymaps.Map("map", {
        center: [41.2995, 69.2401],
        zoom: 10
      });
      setMap(mapInstance);
    });
  };

  const addPolygon = () => {
    const name = prompt("Enter the name for the polygon:");
    if (!name) return;

    const drawingManager = new ymaps.drawing.Manager({
      drawingMode: 'polygon',
      drawingCursor: 'crosshair',
    });

    drawingManager.events.add("overlayadd", (event) => {
      const polygon = event.get('overlay');
      const coordinates = polygon.geometry.getCoordinates()[0];
      setPolygons(prevPolygons => [...prevPolygons, { name, coordinates }]);
    });

    map.geoObjects.add(drawingManager);
    drawingManager.startDrawing();
  };

  const copyToClipboard = () => {
    const text = polygons.map(polygon => `${polygon.name}: ${JSON.stringify(polygon.coordinates)}`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Polygons' coordinates copied to clipboard.");
  };

  return (
        <div>
          <button onClick={addPolygon}>Add Polygon</button>
          <button onClick={copyToClipboard}>Copy Coordinates to Clipboard</button>
          <div>
            <h2>Polygons:</h2>
            <ul>
              {polygons.map((polygon, index) => (
                <li key={index}>
                  <strong>{polygon.name}</strong>: {JSON.stringify(polygon.coordinates)}
                </li>
              ))}
            </ul>
          </div>
          <div className="lngLat">
            <span className="one">Lat</span>
            <span className="two">, Lng</span>
          </div>
          <div>
            <span>Coordinates:</span>
            <div id="info"></div>
          </div>
          <textarea id="input-coordinates" placeholder="Enter coordinates here"></textarea>
          <div id="map" style={{ width: "100%",height: '100vh'}}></div>
        </div>
    )
})