import React, { useEffect, useRef, useState } from 'react';
import './weather-media.css'
import './Weather.css'
import search_icon from '../assets/search.png'
import icons from '../assets'

const Weather = () => {


    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": icons.clear,
        "01n": icons.clear,
        "02d": icons.cloud,
        "02n": icons.cloud,
        "03d": icons.cloud,
        "03n": icons.cloud,
        "04d": icons.drizzle,
        "04n": icons.drizzle,
        "09d": icons.rain,
        "09n": icons.rain,
        "10d": icons.rain,
        "10n": icons.rain,
        "13d": icons.snow,
        "13n": icons.snow,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json()
            console.log(data);
            const icon = allIcons[data.weather[0].icon]
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
        }
    }

    useEffect(() => {
        search("New York");
    }, [])

    return (
        <div>
            <div className="weather">
                <div className="search-bar">
                    <input ref={inputRef} type="text" placeholder='Search' />
                    <img src={search_icon} onClick={() => search(inputRef.current.value)} alt="" />
                </div>
                {weatherData ? <>
                    <img src={weatherData.icon} alt="" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={icons.humidity} alt="" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={icons.wind} alt="" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </> : <></>}
            </div>
        </div>
    );
}

export default Weather;
