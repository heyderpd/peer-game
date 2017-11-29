import React from 'react'

import Choosed from './choosed'

const Restart = ({ sendRestart, winner, myChoose, friendChoose }) => {
  return (
    <div className='cp-restart'>
      <div className='choosed-box'>
        <span>you choose:</span>
        <Choosed card={myChoose} />
      </div>
      <div className='choosed-box'>
        <span>friend choose:</span>
        <Choosed card={friendChoose} />
      </div>
      <div>
        Result: {winner}!
      </div>
      <button
        className='btn-style'
        onClick={sendRestart}
      >
        restart
      </button>
    </div>
  )
}

export default Restart
