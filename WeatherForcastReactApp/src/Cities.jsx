import React, { useEffect, useState } from 'react'
import './Cities.css';
import { useNavigate } from 'react-router-dom';

const Cities = () => {

  const [data,setData] = useState([]);
  const [city, setCity] = useState("");
  const Navigate = useNavigate();

    const getData = async() => {
        const result = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en%2Cname%2Cpopulation%2Ctimezone%2Ccoordinates&limit=100`);
        const res =  await result.json();
        // console.log(res.results);
        setData([...res.results]);
        // console.log(data);
    }
    const searchData = async() => {
      const result = await fetch(`/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en%2Cname%2Cpopulation%2Ctimezone%2Ccoordinates&where=search(name%2C%20%22${city}%22)&limit=100`);
      const res =  await result.json();
      console.log(res.result);
      setData([...res.results]);
      console.log(data);
  }
   
      let handleChange = (evt) => {
          setCity(evt.target.value);
      }

      let handleSubmit = async(evt) => {
          try {
              evt.preventDefault();
              setCity("");
              let newInfo = await searchData();
              updateInfo(newInfo);
          }catch(err) {
          }
        
      }
    const fetchData = (city) => {
       
            const getWeather_Forcast = async() => {
                const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5f6f5d5249fab277ae3cc561f91a20bf`);
                const weather =  await result.json();
                // console.log(res);
                // setWeather([res]);
                // console.log(weather);

                const result1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=5f6f5d5249fab277ae3cc561f91a20bf`);
                const res =  await result1.json();
                const forcast = res.list;
                // // console.log(res.list);
                // setForcast([res1.list]);
                // console.log(forcast);  

                Navigate('/CityWeather' ,{state : { weather,forcast}});
            }           
            getWeather_Forcast();
    }
    useEffect(() => {
        getData();
       
    },[]);

  return (
    <>
        <nav className=''> 
            <h1>CITIES</h1>
            <div className="search">
                <form style={{display:"flex" , gap:"10px"}}>
                    <input type='text' placeholder='Enter City Name' style={{width:"80%",height:"100%", marginTop:"20px", fontSize:'1.8vw' }} onChange={handleChange}></input>
                    <button style={{width:"20%",height:"100%", marginTop:"20px", fontSize:'1.8vw' }} onClick={handleSubmit}> Search</button>
                </form>
            </div>
        </nav>

        <h3 style={{textAlign:"center"}}>CITIES DATAILS</h3>
        <div className="table">
        <table>
          <tbody>
            <tr>
              <th style={{width:"200px"}}>City name</th>
              <th style={{width:"150px"}}>Country name</th>
              <th style={{width:"150px"}}>TimeZone</th>
              <th style={{width:"100px"}}>Population</th>
              <th style={{width:"300px"}}>Coodinates</th> 
            </tr>
            
           {
              data.map((el,idx) => {
                return(
                  <tr style={{borderBottom:"1px solid black"}}>
                    <td key={idx}><a onClick={ () => fetchData(el.name)} style={{textDecoration:"none",color:"black"}} >{el.name}</a></td>
                    <td>{el.cou_name_en}</td>
                    <td>{el.timezone}</td>
                    <td>{el.population}</td>
                    <td>{el.coordinates.lon}(lon) & {el.coordinates.lat}(lat)</td>
                  </tr>
                )
              })
           }
          </tbody> 
        </table>
        </div>
    
    </>
  )
}

export default Cities