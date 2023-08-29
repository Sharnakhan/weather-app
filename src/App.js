import './App.css';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState("");  
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(location.trim()!== ""){ 
      let loc = location.charAt(0).toUpperCase() + location.slice(1);
      fetch("http://localhost:8088/weather/get/current/"+loc)
      .then(res=> res.json())
      .then(data => setWeatherData(JSON.parse(data.data)));
    }else{
      setWeatherData();
      setLocation(""); 
      setError(true);
    }
  }

  return (
    <div className="App" style={{padding: '4px'}}>
      <h1>Welcome to the Weather App</h1>
      <h2>Enter the location to get accurate forecast.</h2>
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder='eg: Lucknow' onChange={(e)=> setLocation(e.target.value)}/>
        <button type="submit">Search</button> 
        {error && <div style={{color: 'red', marginTop: '10px'}}>Please, enter valid city/country name</div>}
      </form> 
      <br></br>
      {weatherData && 
        <>
          <div>Current condition in <strong style={{color: 'red'}}>{weatherData.location.name + ", " + weatherData.location.country}</strong></div>
          <div>
            <div>Condition: <strong>{weatherData.current.condition.text}</strong></div>
            <div>Temperature: <strong>{weatherData.current.temp_c + " celsius"}</strong></div>
            <div>Feels like: <strong>{weatherData.current.feelslike_c + " celsius"}</strong></div>
            <div>Humidity: <strong>{weatherData.current.humidity}</strong></div> 
            <div>Wind: <strong>{weatherData.current.wind_kph + " kph"}</strong></div>
          </div>
        </>
      }
    </div>
  );
}

export default App;