import React from 'react'

const Choosed = ({ onClick, card }) => {
  return (
    <button
      className='cp-choosed'
      onClick={onClick}
    >
      <img src={`/${card}.png`} height="42" width="42"/>
    </button>
  )
}

export default Choosed
