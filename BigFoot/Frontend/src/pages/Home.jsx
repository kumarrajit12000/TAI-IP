import React from 'react'
import Category from './components/Category'
import ImageSlider from "./components/ImageSlider";
import CardSection from './components/CardSection';

const Home = () => {
  const images = [
    '../src/assets/i1.jpg',
    '../src/assets/i2.jpg',
];

  return (
    <>
    <Category />
    <div className="App">
      <div style={{padding: "10px"}}>
        <ImageSlider images={images} />
        <CardSection />
      </div>
    </div>
    </>
    
  )
}

export default Home