import React from 'react'

import Choosed from './choosed'

const Restart = ({ sendRestart, winner, myChoose, friendChoose }) => {
  return (
    <div>
      <span>
        you choose:
        <Choosed value={myChoose} />
      </span>
      <span>
        friend choose:
        <Choosed value={friendChoose} />
      </span>
      {winner}!
      <button onClick={sendRestart}>restart</button>
    </div>
  )
}

export default Restart
