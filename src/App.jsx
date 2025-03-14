import React, { useEffect, useState } from 'react';
import Card from './components/Card.jsx';
import ForecastCard from './components/ForecastCard.jsx';
import {
  getDay,
  getDate,
  getImgUrl,
  getTime,
  checkTemp
} from './function/index.js'

const App = () => {
  const [location, setLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [weatherData, setWeatherData] = useState({
    city: '',
    temperature: '--',
    feelLike: '--',
    description: '...',
    img : "",
    date: '--',
    sunrise: '--:-- AM/PM',
    sunset: '--:-- AM/PM',
    humidity: '00%',
    windSpeed: '0.00 KM/h',
    clouds: '--',
    pressure: '-- hpa',
    timezone : null,
  });
  const [weatherDataAll, setWeatherDataAll] = useState({
    city: '',
    temperature: '--',
    feelLike: '--',
    description: '...',
    img : "",
    date: '--',
    sunrise: '--:-- AM/PM',
    sunset: '--:-- AM/PM',
    humidity: '00%',
    windSpeed: '0.00 KM/h',
    clouds: '--',
    pressure: '-- hpa',
    timezone : null,
  });
  const [allForecast, setAllForecast] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [phase, setPhase] = useState(0);

  const handleUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };

  const handleSearch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=${import.meta.env.VITE_APPID}&exclude=minutely&units=metric&q=${location}`)
    .then((res) => res.json())
    .then((data) => {
        if(data.cod !='' && data.cod !=200){
            alert(data.message);
            return;
        }
        setAllForecast(data.list);
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_APPID}&exclude=minutely&units=metric&` + `lon=${data.city.coord.lon}&lat=${data.city.coord.lat}`)
        .then((res) => res.json())
        .then((metricData) =>{
          // set all basic data to obj
          setWeatherDataAll({
            city: `${metricData.name}, ${metricData.sys.country}`,
            temperature:  metricData.main.temp,
            feelLike: metricData.main.feels_like,
            description: metricData.weather[0].description,
            img : getImgUrl(metricData.weather[0].icon),
            date: `${getDay(metricData.dt-23400, metricData.timezone)}, ${getDate(metricData.dt-23400, metricData.timezone)} at ${getTime(metricData.dt-23400, metricData.timezone)}`,
            sunrise : getTime(metricData.sys.sunrise+19800, metricData.timezone),
            sunset : getTime(metricData.sys.sunset+19800, metricData.timezone),
            humidity : metricData.main.humidity + "%",
            windSpeed : metricData.wind.speed + " KM/h",
            clouds : metricData.clouds.all + "%",
            pressure : metricData.main.pressure+" hPa",
            timezone : metricData.timezone
          })
        })
        .then(() =>{
          setPhase(1);
        })
      }
    )
  };

  useEffect(() => {
    upDateForecast(allForecast,weatherDataAll);
    setWeatherData({
      city: weatherDataAll.city,
      temperature: checkTemp(weatherDataAll.temperature, temperatureUnit),
      feelLike: checkTemp(weatherDataAll.feelLike, temperatureUnit),
      description: weatherDataAll.description,
      img : weatherDataAll.img,
      date: weatherDataAll.date,
      sunrise: weatherDataAll.sunrise,
      sunset: weatherDataAll.sunset,  
      humidity: weatherDataAll.humidity,
      windSpeed: weatherDataAll.windSpeed,
      clouds: weatherDataAll.clouds,
      pressure: weatherDataAll.pressure,
      timezone : weatherDataAll.timezone,
    })
  }, [setWeatherDataAll, allForecast,phase]);

  useEffect(() => {
    setWeatherData({
      city: weatherDataAll.city,
      temperature: checkTemp(weatherDataAll?.temperature, temperatureUnit),
      feelLike: checkTemp(weatherDataAll?.feelLike, temperatureUnit),
      description: weatherDataAll.description,
      img : weatherDataAll.img,
      date: weatherDataAll.date,
      sunrise: weatherDataAll.sunrise,
      sunset: weatherDataAll.sunset,  
      humidity: weatherDataAll.humidity,
      windSpeed: weatherDataAll.windSpeed,
      clouds: weatherDataAll.clouds,
      pressure: weatherDataAll.pressure,
      timezone : weatherDataAll.timezone,
    })
    upDateForecast(allForecast,weatherData);
  }, [temperatureUnit]);

  const updatePhase = (isNext) =>{
    if (isNext) {
      if(phase > 4) return;
      setPhase((prev) => prev+1);
    } else {
      if(phase <= 1) return;
      setPhase((prev) => prev-1);
    }
  }
  
  const upDateForecast = (forecastX,weatherData) =>{
    let elements = [];
    let elementsRange = (phase-1)*8;
    for (let i = 0; i < 8; i++) {
        elements[i] = {
          key : weatherData?.timezone + (i*100),
          date : getDate(forecastX[elementsRange+i]?.dt,weatherData?.timezone),
          time : getTime(forecastX[elementsRange+i]?.dt,weatherData?.timezone),
          img : getImgUrl(forecastX[elementsRange+i]?.weather[0].icon),
          description: forecastX[elementsRange+i]?.weather[0].description,
          maxTemp : checkTemp(forecastX[elementsRange+i]?.main.temp_max, temperatureUnit),
          minTemp : checkTemp(forecastX[elementsRange+i]?.main.temp_min, temperatureUnit),
        }
    }
    setForecast(elements);
  }

  return (
    <div className="container">
      <div className="main1">
        <div className="inputEle">
          <input
            type="text"
            id="location"
            placeholder="Search City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select className="converter" value={temperatureUnit} onChange={handleUnitChange}>
            <option value="C">˚C</option>
            <option value="F">˚F</option>
          </select>
          <span id="search" onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.83,20.17l-4.72-4.71c1.19-1.32,1.91-3.08,1.91-4.98c0-4.14-3.36-7.5-7.5-7.5c-4.13,0-7.5,3.36-7.5,7.5   c0,4.13,3.37,7.5,7.5,7.5c1.86,0,3.58-0.68,4.88-1.82l4.72,4.72c0.1,0.1,0.22,0.15,0.35,0.15c0.13,0,0.26-0.05,0.36-0.15   C21.02,20.69,21.02,20.37,20.83,20.17z M15.07,15.12c-1.17,1.15-2.78,1.86-4.55,1.86c-3.58,0-6.5-2.92-6.5-6.5   c0-3.59,2.92-6.5,6.5-6.5c3.59,0,6.5,2.91,6.5,6.5C17.02,12.29,16.27,13.94,15.07,15.12z"/><path d="M15.42 10.97c-.28 0-.5-.22-.5-.5 0-1.18-.46-2.29-1.3-3.12-.2-.2-.2-.51 0-.71.19-.19.51-.2.71 0 1.03 1.02 1.6 2.38 1.6 3.83C15.92 10.75 15.7 10.97 15.42 10.97zM5.63 10.97c-.28 0-.5-.22-.5-.5 0-2.97 2.42-5.39 5.4-5.39.28 0 .5.22.5.5s-.22.5-.5.5c-2.42 0-4.4 1.97-4.4 4.39C6.13 10.75 5.91 10.97 5.63 10.97z"/></svg>
          </span>
        </div>
        <hr />
        <div className="data">
          <div className="weatherData">
            <div className="city">{weatherData.city} {weatherData.country}</div>
            <div className="weatherIcon">
              {weatherData.img != '' ? <img src={weatherData.img} alt=''/> : ""}
            </div>
          </div>
          <div className="details">
            <div className="temperature">{weatherData.temperature}</div>
            <div className="feelLikes">Feel Like {weatherData.feelLike}</div>
            <div className="description">{weatherData.description}</div>
            <hr />
            <div className="date">{weatherData.date}</div>
          </div>
        </div>
      </div>
      <div className="main2">
        <h2 className="heading">Today's Highlight</h2>
        <div className="highlight">
            <Card moreClass='Sunsr' imgOrsvg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 13a1 1 0 0 0-1 1v2.5a1 1 0 0 0 2 0V14A1 1 0 0 0 16 13zM29 28H24.94A9 9 0 0 0 7.06 28H3a1 1 0 0 0 0 2H29a1 1 0 0 0 0-2zM9.07 28a7 7 0 0 1 13.86 0zM24.84 21.16a1 1 0 0 0 .71-.29l1.76-1.77a1 1 0 0 0-1.41-1.41l-1.77 1.76a1 1 0 0 0 0 1.42A1 1 0 0 0 24.84 21.16zM6.45 20.87a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.42L6.1 17.69A1 1 0 0 0 4.69 19.1zM13.88 6.54L15 5.41V10a1 1 0 0 0 2 0V5.41l1.12 1.13a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.42L16.71 2.29a1 1 0 0 0-1.42 0L12.46 5.12a1 1 0 0 0 1.42 1.42z"/></svg>} name="Sunrise" data={weatherData.sunrise}/>
            <Card moreClass='Sunsr' imgOrsvg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 13a1 1 0 0 0-1 1v2.5a1 1 0 0 0 2 0V14A1 1 0 0 0 16 13zM29 28H24.94A9 9 0 0 0 7.06 28H3a1 1 0 0 0 0 2H29a1 1 0 0 0 0-2zM9.07 28a7 7 0 0 1 13.86 0zM24.84 21.16a1 1 0 0 0 .71-.29l1.76-1.77a1 1 0 0 0-1.41-1.41l-1.77 1.76a1 1 0 0 0 0 1.42A1 1 0 0 0 24.84 21.16zM6.45 20.87a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.42L6.1 17.69A1 1 0 0 0 4.69 19.1zM15.29 10.71a1 1 0 0 0 .32.21 1 1 0 0 0 .78 0 1 1 0 0 0 .32-.21l2.83-2.83a1 1 0 0 0-1.42-1.42L17 7.59V3a1 1 0 0 0-2 0V7.59L13.88 6.46a1 1 0 0 0-1.42 1.42z"/></svg>} name="Sunset" data={weatherData.sunset}/>
            <Card imgOrsvg={<svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 48 48"><path d="M26 30c0-6.393-10.805-18.18-11.265-18.678a1.032 1.032 0 0 0-1.47 0C12.805 11.82 2 23.607 2 30a12 12 0 0 0 24 0ZM14 40A10.011 10.011 0 0 1 4 30c0-4.315 6.646-12.717 10-16.507C17.354 17.283 24 25.685 24 30a10.011 10.011 0 0 1-10 10Z"/><path d="M29.798.397a1 1 0 0 0-1.596 0c-.044.058-4.396 5.834-8.523 12.518a1 1 0 0 0 1.702 1.05C24.41 9.06 27.564 4.647 29 2.683 32.21 7.074 44 23.702 44 31a15.011 15.011 0 0 1-23.851 12.121 1 1 0 0 0-1.178 1.617A17.012 17.012 0 0 0 46 31C46 21.929 30.459 1.271 29.798.396Z"/><path d="M21 29a1 1 0 0 0-1 1 6.007 6.007 0 0 1-6 6 1 1 0 0 0 0 2 8.01 8.01 0 0 0 8-8 1 1 0 0 0-1-1zm21 2a1 1 0 0 0-2 0 11.012 11.012 0 0 1-11 11 1 1 0 0 0 0 2 13.015 13.015 0 0 0 13-13z"/></svg>} name="Humidity" data={weatherData.humidity}/>
            <Card imgOrsvg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M60.637,15.038c-3.116-4.134-8.386-4.383-15.662-.746-.479,.239-.673,.821-.433,1.3,.239,.479,.821,.674,1.3,.433,6.319-3.159,10.776-3.098,13.248,.18,1.592,2.112,1.82,4.823,.609,7.251-1.272,2.553-3.811,4.139-6.625,4.139H7.481c-.535,0-.969,.434-.969,.969s.434,.969,.969,.969H53.075c3.553,0,6.756-1.997,8.359-5.212,1.545-3.1,1.248-6.57-.797-9.282Z"/><path d="M3.787 17.219h31.903c2.597 0 4.938-1.459 6.109-3.808 1.131-2.27.913-4.812-.586-6.8-1.565-2.077-4.8-3.868-11.321-.607-.479.239-.673.821-.433 1.3.239.478.821.674 1.3.433 4.279-2.139 7.276-2.125 8.907.041 1.046 1.388 1.195 3.171.399 4.769-.841 1.687-2.517 2.735-4.375 2.735H3.787c-.535 0-.969.434-.969.969s.434.969.969.969zM52.065 37.615H6.47c-.535 0-.969.433-.969.969s.434.969.969.969H52.065c2.814 0 5.352 1.586 6.625 4.139 1.21 2.428.982 5.139-.61 7.251-2.471 3.278-6.928 3.341-13.247.18-.48-.237-1.06-.044-1.3.433-.239.479-.045 1.061.433 1.3 3.405 1.702 6.37 2.553 8.881 2.553 2.856 0 5.123-1.1 6.781-3.301 2.044-2.711 2.342-6.181.797-9.282-1.603-3.215-4.805-5.212-8.359-5.212zM6.25 34.458H45.651c.535 0 .969-.433.969-.969s-.434-.969-.969-.969H6.25c-.535 0-.969.434-.969.969s.434.969.969.969zM14.113 21.713c0 .535.434.969.969.969H54.483c.535 0 .969-.434.969-.969s-.434-.969-.969-.969H15.081c-.535 0-.969.434-.969.969zM57.964 34.458c.535 0 .969-.433.969-.969s-.434-.969-.969-.969h-7.388c-.535 0-.969.434-.969.969s.434.969.969.969h7.388zM3.471 22.681h7.388c.535 0 .969-.434.969-.969s-.434-.969-.969-.969H3.471c-.535 0-.969.434-.969.969s.434.969.969.969z"/><path d="M30.617 42.619c-.332-.112-8.186-2.709-12.242.885-3.769 3.34-4.86 8.382-2.706 11.713l-6.871 6.09c-.401.355-.438.967-.083 1.367.192.217.458.326.726.326.228 0 .458-.08.642-.244l6.871-6.09c1.295 1.079 2.963 1.619 4.748 1.619 2.416 0 5.038-.977 7.206-2.899 4.056-3.594 2.42-11.704 2.348-12.047-.07-.336-.313-.61-.638-.72zm-2.995 11.318c-2.949 2.614-6.845 3.149-9.195 1.423l2.107-1.867s.003-.003.004-.004l6.933-6.145c.401-.355.438-.967.083-1.367-.356-.401-.969-.438-1.367-.082l-5.205 4.614.123-2.039c.032-.534-.375-.993-.909-1.026-.53-.026-.993.375-1.025.908l-.239 3.973-1.788 1.585c-1.429-2.541-.431-6.344 2.517-8.957 2.692-2.384 8.073-1.143 9.794-.66.272 1.767.859 7.258-1.832 9.644zM48.991 11.556c2.91 0 5.278-2.367 5.278-5.278s-2.368-5.278-5.278-5.278-5.278 2.368-5.278 5.278 2.367 5.278 5.278 5.278zm0-8.619c1.842 0 3.341 1.499 3.341 3.341s-1.499 3.341-3.341 3.341-3.341-1.499-3.341-3.341 1.499-3.341 3.341-3.341zM8.488 13.461c2.911 0 5.278-2.368 5.278-5.278s-2.368-5.278-5.278-5.278S3.21 5.272 3.21 8.182s2.367 5.278 5.278 5.278zm0-8.619c1.842 0 3.341 1.499 3.341 3.341s-1.499 3.341-3.341 3.341-3.34-1.499-3.34-3.341 1.499-3.341 3.34-3.341zM5.018 44.833c-1.892 0-3.431 1.539-3.431 3.431s1.539 3.431 3.431 3.431 3.431-1.539 3.431-3.431-1.539-3.431-3.431-3.431zm0 4.925c-.824 0-1.494-.67-1.494-1.494s.67-1.494 1.494-1.494 1.494.67 1.494 1.494-.67 1.494-1.494 1.494zM40.25 53.374c-1.892 0-3.431 1.539-3.431 3.431s1.539 3.431 3.431 3.431 3.431-1.539 3.431-3.431-1.539-3.431-3.431-3.431zm0 4.925c-.824 0-1.494-.67-1.494-1.494s.67-1.494 1.494-1.494 1.494.67 1.494 1.494-.67 1.494-1.494 1.494z"/></svg>} name="Wind Speed" data={weatherData.windSpeed}/>
            <Card imgOrsvg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M27.194 19.995c2.115-0.106 3.806-1.854 3.806-3.995 0-1.901-1.334-3.497-3.121-3.901 0.079-0.354 0.121-0.721 0.121-1.099 0-2.761-2.239-5-5-5-1.868 0-3.497 1.025-4.356 2.543-0.637-0.346-1.368-0.543-2.144-0.543-1.728 0-3.229 0.974-3.983 2.404 1.293 0.428 2.44 1.177 3.346 2.153 0.806-0.358 1.698-0.557 2.637-0.557 3.347 0 6.102 2.529 6.461 5.78 0.927 0.527 1.699 1.293 2.234 2.215v0 0zM27 23c0 2.756-2.238 5-4.999 5h-17.001c-2.767 0-4.999-2.239-4.999-5 0-2.051 1.24-3.818 3.012-4.588-0.008-0.136-0.012-0.273-0.012-0.412 0-3.866 3.134-7 7-7 2.298 0 4.337 1.107 5.614 2.817 0.839-0.518 1.828-0.817 2.886-0.817 3.009 0 5.454 2.416 5.499 5.415 1.768 0.771 3.001 2.534 3.001 4.585v0z"/></svg>} name="Clouds" data={weatherData.clouds}/>
            <Card imgOrsvg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M42.84 16.98c0-2.03-1.35-3.73-3.24-4.25-.43-2.16-2.36-3.8-4.62-3.8 0 0 0 0-.01 0-.85-1.5-2.47-2.47-4.22-2.47-1.83 0-3.46 1.01-4.29 2.58-2.44-.32-4.57 1.28-5.12 3.52-2.33.16-4.18 2.1-4.18 4.47 0 2.47 2.01 4.48 4.49 4.48.08 0 .18-.01.3-.02 1.21-.11 2.38.32 3.2 1.19.62.66.95 1.5.97 2.39h7.74c-.01-.95.35-1.86 1.02-2.56.8-.85 1.93-1.26 3.09-1.13.18.02.33.03.44.03C40.85 21.41 42.84 19.42 42.84 16.98zM35.35 27.07h-10.7c-.45 0-.86.31-.97.76-.72 2.86-2.31 5.85-4.26 8.71l6.17-2.78c.25-.12.55-.12.81-.01.26.11.46.33.55.6l1.08 3.2 2.05-3.4c.19-.3.54-.49.87-.48.36 0 .68.19.86.5l4.07 7.17 3.16-7.08c.01-.02.03-.04.04-.06-1.25-2.12-2.24-4.28-2.76-6.37C36.21 27.38 35.8 27.07 35.35 27.07z"/><path d="M40.36,36.22l-3.46,7.74c-0.15,0.34-0.49,0.57-0.86,0.59h-0.05c-0.36,0-0.69-0.19-0.87-0.51l-4.21-7.4l-2.29,3.79c-0.2,0.33-0.58,0.52-0.96,0.47c-0.39-0.04-0.72-0.3-0.84-0.67l-1.41-4.2l-8.42,3.8C11.73,46.45,5.46,51.69,5.36,51.77c-0.32,0.27-0.44,0.71-0.3,1.11S5.58,53.54,6,53.54h48c0.42,0,0.8-0.26,0.94-0.66s0.02-0.84-0.3-1.11C54.52,51.67,45.86,44.44,40.36,36.22z"/></svg>} name="Pressure" data={weatherData.pressure}/>
        </div>
        <h2 className="heading">
                <span id="previous" onClick={() => updatePhase(false)}>
                    <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-left"><rect width="24" height="24" opacity="0"/><path d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26 1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59 2.23 2.23 0 0 1-.91.2z"/></g></g></svg>
                </span>
                forecast
                <span id="next" onClick={() => updatePhase(true)}>
                    <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-right"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)"/><path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46z"/></g></g></svg>
                </span>
            </h2>
            <div className="forecast">
            {(phase != 0) ? forecast.map((countForecast) => (
                <ForecastCard key={countForecast.key} date={countForecast.date} time={countForecast.time} imgSource={countForecast.img} description={countForecast.description} maxTemp={countForecast.maxTemp} minTemp={countForecast.maxTemp}/>
            )) : <div></div>}
            </div>
      </div>
    </div>
  );
};

export default App;
