import React from 'react'

const Options = ({ chooseRock, choosePaper, chooseScissors }) => {
  return (
    <div>
      <button onClick={chooseRock}>rock</button>
      <button onClick={choosePaper}>paper</button>
      <button onClick={chooseScissors}>scissors</button>
    </div>
  )
}

export default Options
