import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { location } from '../../lib/utils'

const CopyLink = ({ getId }) => {
  return (
    <CopyToClipboard text={`${location()}/rps?join&${getId()}`}>
      <button>copy link and send to a friend!</button>
    </CopyToClipboard>
  )
}

export default CopyLink
