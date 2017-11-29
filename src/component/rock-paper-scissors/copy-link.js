import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { location } from '../../lib/utils'

const CopyLink = ({ getId }) => {
  const link = `${location()}/peer-game/?join=${getId()}`

  return (
    <div className='cp-copy'>
      <span>Send link to your friend!</span>
      <CopyToClipboard text={link} >
        <button className="btn-style">
          click to copy
        </button>
      </CopyToClipboard>
    </div>
  )
}

export default CopyLink
