import React from "react";
import "./weathercard.scss";
import { AiOutlineClose } from "react-icons/ai";

const WeatherCard = ({ id, main, name, sys, weather, iconUrl ,setData,data}) => {

   const deleteWeather = ()=>{
 const newData = data.filter((city)=> city.id !== id)
 setData(newData)
   }
  return (
    <div className="weather-container" >
      <div className="button-container">
        <button onClick={deleteWeather} >
          <AiOutlineClose />
        </button>
      </div>

      <h2 className="city-name">
        <span>{name}</span>
        <sup>{sys.country}</sup>
      </h2>
      <div className="city-temp">
        {Math.round(main.temp)}
        <sup>°C</sup>
      </div>
      <figure>
        <img className="city-icon" src={iconUrl} alt="" />
        <figcaption>{weather[0].description}</figcaption>
      </figure>
    </div>
  );
};

export default WeatherCard;
