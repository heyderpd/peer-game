import React from 'react'

import Choosed from './choosed'

const Options = ({ chooseRock, choosePaper, chooseScissors }) => {
  return (
    <div className='cp-options'>
      <span>Choose!</span>
      <Choosed onClick={chooseRock} card='rock' />
      <Choosed onClick={choosePaper} card='paper' />
      <Choosed onClick={chooseScissors} card='scissors' />
    </div>
  )
}

export default Options
