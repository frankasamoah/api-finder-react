import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import "./App.css";
import { DateTime } from "luxon";


function App() {
  const [ip, setIp] = useState(null);
 
  const [isLoading, setLoading] = useState(true);


  // useEffect(() => {
    
  //     const getIp = async () => {
  //         setLoading(true);

  //         const ip = await axios.get(
  //             `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_FINDER_KEY}`
  //     );
  //     const data = ip.data;
  //     console.log(data);
  
  //     setIp(data);
  
  
  //   };
  //   getIp();
  //   setLoading(false);
  // }, []);

  
  
  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    const getCode = async () => {

      const code = await axios.get(`https://restcountries.com/v3.1/alpha/${ip.location.country}`);
      const codes = code.data;
      console.log(codes);

      setCountryCode(codes);
    };
    getCode();
  }, [ip.location.country]);

  // useEffect(() => {

  //   const getCode = async () => {
  //     setLoading(true);

  //     const code = await axios.get(
  //       `https://api.countrylayer.com/v2/de?access_key=168a8d2297b62719c06cbb426d1feff5`
  //     );
  //     const codes = code.data;
  //     console.log(codes);

  //     // setCountryCode(codes)

  //   };
  //   getCode();

  // }, []);

 

  // for input
  //@ &ipAddress=8.8.8.8

  //  if(isLoading) {
  //   return (
  //     <p className="loader"></p>
  //   )
  //  }

  // display local time


  

  return (
    <div id="app">
<div className="container text-center container-small">
      <h2 >Find <span style={{color: "#ECBDF1"}}>My</span> <span style={{color: "#CE8ED5"}}>IP</span></h2>
      <Link to="/search"><button className="button button1">MY IP</button></Link>
      
      </div>   
      <div className="container">
      
      <div className="divider">
      <div className="text-container">
            {/* conditional rendering */}
            <h3>Your IP: {ip && ip.ip}</h3>
            {/* <img
            scr={countryCode && countryCode[0].flags.png}
            alt={countryCode && countryCode[0].name.common}
          style={{width: "6.5rem"}}/> */}
            {/* as a fallback if image doesn't show */}
            <h4>
              Country:{" "}
              {countryCode &&
                `${countryCode[0].name.common} ${countryCode[0].flag}`}
            </h4>
            <h4>Capital: {countryCode && countryCode[0].capital}</h4>
            <h5>Continent: {countryCode && countryCode[0].continents[0]}</h5>
            <h5>
              Population:{" "}
              {countryCode &&
                countryCode[0].population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h5>
            <p>Local time</p>
          </div>
          <div className="map-container">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
