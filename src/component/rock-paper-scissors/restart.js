import React from 'react'

const Restart = ({ sendRestart, winner }) => {
  return (
    <div>
      {winner}!
      <button onClick={sendRestart}>restart</button>
    </div>
  )
}

export default Restart
