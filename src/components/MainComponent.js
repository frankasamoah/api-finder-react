import { useState, useMemo, useCallback } from "react";
import axios from "axios";
import { DateTime } from "luxon";

import "./MainComponent.css";
import Map from "../Map";
import SearchBar from "./SearchBar";

const MainComponent = () => {
  const [search, setSearch] = useState(null);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setLoading] = useState(true);

  useMemo(() => {
    const getIp = async () => {
      try {
        const ip = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_FINDER_KEY}&ipAddress=${query}`
        );
        const data = ip.data;
        console.log(data);
        setSearch(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getIp();
  }, [query]);

  useMemo(() => {
    const getCode = async () => {
      try {
        const code = await axios.get(
          `https://restcountries.com/v3.1/alpha/${search?.location?.country}`
        );
        const codes = code.data;
        setCountry(codes);
      } catch (error) {
        console.error(error);
      }
    };
    getCode();
  }, [search]);

 

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setQuery(text);
      setText("");
     
    },
    [text]
  );

  const handleChange = useCallback(({ target }) => {
    setText(target.value);
  }, []);

  const ip = useMemo(() => search?.ip || "", [search]);

  const name = useMemo(
    () => country && `${country[0].name.common} ${country[0].flag}`,
    [country]
  );
  const capital = useMemo(() => country && country[0].capital, [country]);
  const continent = useMemo(
    () => country && country[0].continents[0],
    [country]
  );
  const population = useMemo(
    () =>
      country &&
      country[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [country]
  );
  const date = DateTime.now().toLocaleString({
    weekday: "long",
    month: "long",
    day: "2-digit",
  });
  const time = DateTime.now().toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
  });
  if (isLoading) {
    return <p className="loader"></p>;
  }

  return (
    <>
      <div className="container text-center container-small">
        <h2>
          Find <span style={{ color: "#ECBDF1" }}>My</span>{" "}
          <span style={{ color: "#CE8ED5" }}>IP</span>
        </h2>

        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
      <div className="container">
        <div className="divider">
          <div className="text-container">
            <h3 style={{fontSize: "1.8rem"}}>Your IP: {ip}</h3>

            <h4 style={{fontSize: "1.4rem"}}>
              Country:{" "}
              {name}
            </h4>
            <h4 style={{fontSize: "1.3rem"}}>Capital: {capital}</h4>
            <h5 style={{fontSize: "1.2rem"}}>Continent: {continent}</h5>
            <h5 style={{fontSize: "1.1rem"}}>
              Population:{" "}
              {population}
            </h5>
            <h6 style={{fontSize: "1rem"}}>Date: {date}</h6>
            <h6 style={{fontSize: "1rem"}}>Time: {time}</h6>
          </div>
          <div className="map-container">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
