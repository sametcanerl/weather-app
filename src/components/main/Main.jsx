import { useState } from "react";
import axios from "axios";
import WeatherCard from "../weathercard/WeatherCard";
import "./main.scss";

const apiKey = process.env.REACT_APP_ApiKey;
const Main = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
  const getCityWeather = async () => {
    try {
      const response = await axios.get(url);

      const { main, name, sys, weather, id } = response.data;
      const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      const isExist = data.some((city) => city.id === id);
   
      if (isExist) {
        alert(
          `You already know the weather for ${name} ,please search for another city`
        );
      } else {
        setData([{ main, name, sys, weather, iconUrl, id }, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    getCityWeather();
  };


  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="cards">
        {data?.map((item) => (
          <WeatherCard key={item.id} {...item} data={data} setData={setData} />
        ))}
      </div>
    </div>
  );
};

export default Main;
