import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { location } from '../../lib/utils'

const CopyLink = ({ getId }) => {
  return (
    <div className='cp-copy'>
      <span>
        ID: { getId() }
      </span>
      <CopyToClipboard text={`${location()}/peer-game/?join=${getId()}`} >
        <button>copy link and send to a friend!</button>
      </CopyToClipboard>
    </div>
  )
}

export default CopyLink
