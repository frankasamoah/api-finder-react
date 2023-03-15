import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";


const Map = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      const success = (position) => {
        let pos = position?.coords;
        setCoords(pos);
      };

      const error = () => {
        console.log("Nothing to show");
      };

      navigator?.geolocation?.getCurrentPosition(success, error);
    };

    getLocation();
  }, []);

  return (
    <>
      {coords && (
        <MapContainer
          center={[coords?.latitude, coords?.longitude]}
          zoom={13}
          scrollWheelZoom={true}
        style={{height: "30rem", borderRadius: "0.5rem"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.latitude, coords.longitude]}>
            <Popup>
              { coords.latitude }, { coords.longitude } 
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
