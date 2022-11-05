import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";


const Map = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // console.log(process.env);
    const getLocation = () => {
      const success = (position) => {
        console.log(position);
        let pos = position.coords;
        console.log(pos);
        setCoords(pos);
      };

      const error = () => {
        console.log("Nothing to show");
      };

      navigator.geolocation.getCurrentPosition(success, error);
    };

    getLocation();
  }, []);

  return (
    <>
    {/* conditional rendering */}
      {coords && (
        <MapContainer
          center={[coords.latitude, coords.longitude]}
          zoom={13}
          scrollWheelZoom={true}
        style={{height: "11.25rem"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.latitude, coords.longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
