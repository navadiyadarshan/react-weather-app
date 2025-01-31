const getDay = (weatherData, timezone) => {
    const date = new Date((weatherData + timezone - 36000-3600) *1000);
    return `${date.toLocaleDateString('en-US', { weekday: 'long'})}`
}

function getTime(timestamp, timezone){
  const date = new Date((timestamp + timezone - 36000-3600) *1000);
  return  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function getDate(timestamp, timezone){
  const date = new Date((timestamp + timezone - 36000-3600) *1000);

 return `${date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short' })}`
}

function getImgUrl(imgCode){
    return `https://openweathermap.org/img/wn/${imgCode}@2x.png`
}

function checkTemp(temp,temperatureUnit){
  // isConverterChange = true;
  if(temperatureUnit == 'F'){
    return (temp*9/5 +32).toFixed(2) + '˚F';
  }
  return temp + '˚C';
}

export {
    getDay,
    getDate,
    getImgUrl,
    getTime,
    checkTemp
}