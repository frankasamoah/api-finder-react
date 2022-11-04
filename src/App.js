import {useState, useEffect} from "react";
import axios from "axios";

function App() {

const [apiData, setApiData] = useState([]);
const [query, setQuery] = useState('dortmund');
const [search, setSearch] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  console.log(process.env);
  axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_FINDER_KEY}&ipAddress=8.8.8.8`).then(res => console.log(res))

}, [])

return (
  <div className="App">
    
  </div>
)
}

export default App;
