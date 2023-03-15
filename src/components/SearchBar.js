import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({handleSubmit, handleChange}) => {

  const [inputValue, setInputValue] = useState("");


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    handleChange(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div className="search-area">
      <form className="form" onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter IP Address..." 
        onChange={handleInputChange}
        value={inputValue}
        on/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
