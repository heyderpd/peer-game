import React from 'react'

import Choosed from './choosed'

const Restart = ({ sendRestart, winner, myChoose, friendChoose }) => {
  return (
    <div className='cp-restart'>
      <span>
        you choose:
        <Choosed> {myChoose} </Choosed>
      </span>
      <span>
        friend choose:
        <Choosed> {friendChoose} </Choosed>
      </span>
      <span>
        Result: {winner}!
      </span>
      <button onClick={sendRestart}>restart</button>
    </div>
  )
}

export default Restart
