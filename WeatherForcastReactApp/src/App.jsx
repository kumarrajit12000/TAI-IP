import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CityWeather from './CityWeather';

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={< CityWeather/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App