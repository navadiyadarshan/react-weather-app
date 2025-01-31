import React from 'react'

function ForecastCard({
    date,
    time,
    imgSource,
    description,
    maxTemp,
    minTemp
}) {
  return (
    <div className="boxForcast">
        <h4>{date}<br/>{time}</h4>
        <div><img src={imgSource} title={description} alt="loading..."/></div>
        <h5>{description}</h5>
        <h5>{maxTemp} / {minTemp}</h5>
    </div>
  )
}

export default ForecastCard