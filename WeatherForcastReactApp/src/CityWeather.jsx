import React, { useEffect, useState } from 'react'
import "./cityWeather.css";
import { Link, useNavigate } from 'react-router-dom';
const CityWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [forcast, setForcast] = useState([]);
  const [checkCity, setcheckCity] = useState(false);
  const [checkWeather, setcheckWeather] = useState(false);

  const images = {
    Rain: '../src/assets/rain.jpg',
    Clouds: '../src/assets/cloud.jpg',
    Clear: '../src/assets/clear.jpg',
    Snow: '../src/assets/snow1.jpg',
    Thunderstorm: "../src/assets/strome.jpg",
    random: "../src/assets/snow.jpg"
  }
  const fetchData = async (city) => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5f6f5d5249fab277ae3cc561f91a20bf`);
      const res = await result.json();
      if (res.cod == 400) {
        setcheckCity(true);
      }else if (res.cod == 404) {
        setcheckWeather(true);
      }else{
        setWeather([res]);
      }
      const result1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=5f6f5d5249fab277ae3cc561f91a20bf`);
      const res1 = await result1.json();
      if (res.cod == 400) {
        setcheckCity(true);
      }else if (res.cod == 404) {
        setcheckWeather(true);
      }else{
        setForcast([...res1.list]);
      }
    }
    catch (err) {
      console.log(err);
    }

  }
  let handleSubmit = async (evt) => {

    setcheckWeather(false);
    setcheckCity(false);
    fetchData(city);
    setCity("")
  }
  useEffect(() => {
    setcheckWeather(false);
    setcheckCity(false);
    fetchData('delhi');
  },[])
  return (
    <div id='bg' style={{ height: '100%', widows: '100%', display: "flex", justifyContent: 'center' }}>
      <img 
      src={
            weather[0].weather[0].main == 'Rain' ? images.Rain :
           weather[0].weather[0].main == 'clouds' ? images.Clouds :
           weather[0].weather[0].main == 'clear' || 'Haze' ? images.Clear :
           weather[0].weather[0].main == 'snow' ? images.Snow :
           weather[0].weather[0].main == 'drizzle' ? images.Rain :
           weather[0].weather[0].main == 'thunderstorm' ? images.Thunderstorm :
           images.Clear
        } />
      <nav className=''>
        <h1>CITIES</h1>
        <div className="search">
          <form style={{ display: "flex", gap: "10px" }}>
            <input type='text' value={city} placeholder='Enter City Name' style={{ width: "80%", height: "100%", marginTop: "20px", fontSize: '20px' }} onChange={(evt) => setCity(evt.target.value)}></input>
            <Link onClick={handleSubmit} style={{ width: "fit-content", marginTop: "20px", fontSize: '20px',border:'1px solid black' ,textDecoration:'none', color:'black', padding:'2px 10px'}}> Search</Link>
          </form>
        </div>
      </nav>
      {
        checkCity ? <p style={{ marginTop: '50px',color:'red',position:'absolute' }}>Enter City Name!</p> : <h1></h1>
      }
      {
        checkWeather ? <h4 style={{ marginTop: '50px',color:'red' ,position:'absolute'}}>No weather Found...Search for another City!</h4> : <h1></h1>
      }
      <div className="weather" style={{ display: 'flex', justifyContent: 'space-evenly', width: '70%', margin: "25px auto", marginTop: '70px', position: 'absolute' }}>
        <div className="temp" style={{ gap: '10px', margin: 'auto 0px' }} >
          <p style={{ fontSize: '20px', margin: '5px 0px' }}> {weather[0].name}, {weather[0].sys.country}</p>
          <p style={{ fontSize: '50px', margin: '5px 0px' }}>{weather[0].main.temp}&deg;C</p>
          <p style={{ fontSize: '25px', margin: '5px 0px' }}>Feels Like <b>{weather[0].main.feels_like}&deg;C </b><i>{weather[0].weather[0].description}</i></p>
        </div>
        <div className="details" style={{ display: 'flex', gap: '50px', margin: 'auto 0px', fontSize: "13px" }}>
          <div className="left">
            <p><b>Temp : </b><i>{weather[0].main.temp}&deg;C</i></p>
            <p><b>Pressure : </b><i>{weather[0].main.pressure}</i></p>
            <p><b>Humidity : </b><i>{weather[0].main.humidity}%</i></p>
            <p><b>visibility : </b><i>{weather[0].visibility}m</i></p>
          </div>
          <div className="right">
            <p><b>Sunrise : </b><i>{weather[0].sys.sunrise}</i></p>
            <p><b>Sunset : </b><i>{weather[0].sys.sunset}</i></p>
            <p><b>Wind_speed : </b><i>{weather[0].wind.speed}m/s</i></p>
            <p><b>Wind_degree : </b><i>{weather[0].wind.deg}&deg;</i></p>
          </div>
        </div>
      </div>
      <h3 style={{ textAlign: "center", position: 'absolute', margin: '250px 0px' }}>5 Day / 3 Hour Forecast Weather</h3>
      <div className="forcast">
        <table>
          <thead>
            <tr>
              <th>Date & time</th>
              <th>Temp</th>
              <th>Pressure</th>
              <th>Humidity</th>
              <th>visibility</th>
              <th>Wind_speed</th>
              <th>Wind_degree</th>
            </tr>
            </thead>
            <tbody>
            {
              forcast.map((el,idx) => {
                return(
                <tr>
                  <td>{el.dt_txt}</td>
                  <td>{el.main.temp}&deg;C</td>
                  <td>{el.main.pressure}</td>
                  <td>{el.main.humidity}%</td>
                  <td>{el.visibility}m</td>
                  <td>{el.wind.speed}m/s</td>
                  <td>{el.wind.deg}&deg;</td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default CityWeather