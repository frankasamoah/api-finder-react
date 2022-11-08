import { useEffect, useState } from "react";
import axios from "axios";
import "./SearchForm.css";
import { DateTime } from "luxon";

const SearchForm = () => {
  const [search, setSearch] = useState(null);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const getIp = async () => {
      setLoading(true);

      const ip = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_FINDER_KEY}&ipAddress=${query}`
      );
      const data = ip.data;
      console.log(data);

      setSearch(data)

    };
    getIp();
    setLoading(false);
  }, [query]);

  useEffect(() => {
    const getCode = async () => {
      

      const code = await axios.get(`https://restcountries.com/v3.1/alpha/${search.location.country}`);
      const codes = code.data;
      console.log(codes);

      setCountry(codes);
    };
    getCode();
  }, [search]);


  

  const handleSubmit = (e) => {
    e.preventDefault();
      setQuery(text);
      setText("");

  };

  const handleChange = ({ target }) => {
    setText(target.value)
  };

  if(isLoading) {
    return (
      <p className="loader"></p>
    )
   }

  return (
    <div className="search-area">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          
          placeholder="Enter IP Address..."
          onChange={handleChange}
        value={text}/>
        <button type="submit">Search</button>
      </form>
      <div className="search-card">
        <h3>Your IP: {search && search.ip}</h3>
        <h4>
        Country:{" "}
        {country &&
          `${country[0].name.common} ${country[0].flag}`}
      </h4>
        <h4>Capital: {country && country[0].capital}</h4>
        <h5>Continent: {country && country[0].continents[0]}</h5>
        <h5>
          Population:{" "}
          {country &&
            country[0].population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h5>
        <h6>Date: {DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })}</h6>
        <h6>Time: {DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit' })}</h6>
      </div>
    </div>
  );
};

export default SearchForm;
