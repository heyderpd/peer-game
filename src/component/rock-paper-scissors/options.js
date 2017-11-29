import React from 'react'

import Choosed from './choosed'

const Options = ({ chooseRock, choosePaper, chooseScissors }) => {
  return (
    <div className='cp-options'>
      Choose!
      <Choosed onClick={chooseRock}>rock</Choosed>
      <Choosed onClick={choosePaper}>paper</Choosed>
      <Choosed onClick={chooseScissors}>scissors</Choosed>
    </div>
  )
}

export default Options
