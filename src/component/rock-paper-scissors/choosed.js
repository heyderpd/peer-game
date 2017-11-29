import React from 'react'

const Choosed = ({ onClick, children }) => {
  return (
    <button
      className='cp-choosed'
      onClick={onClick}
    >
      { children }
    </button>
  )
}

export default Choosed
