import React from 'react'

function Card({
    moreClass = "",
    imgOrsvg,
    name,
    data
}) {
  return (
    <div className={`box ${moreClass}`}>
        <div>
            {imgOrsvg}
            <p>{name}<br /><span>{data}</span></p>
        </div>
    </div>
  )
}

export default Card;