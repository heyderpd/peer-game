import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import gameCore from '../../lib/game'
import Options from './options'
import Restart from './restart'
import CopyLink from './copy-link'
import { splitQuery, location } from '../../lib/utils'

class RockPaperScissorsComponent extends Component {

  constructor() {
    super()
    this.state = {
      host: false,
      game: null,
      data: ''
    }
  }

  componentWillMount() {
    this.setState({
      host: splitQuery()[0] !== 'join',
      game: new gameCore(this.changeState.bind(this))
    })
  }

  changeState(data) {
    console.log('-*-changeState', data)
    this.setState({ data })
  }

  render() {
    const { host, game, data } = this.state
    console.log('render', data)

    return (
      <div>
        <h1>{ host ? 'HOST' : 'JOIN' }</h1>

        { host &&
          <CopyLink {...game} /> }

        { host &&
          <pre>
            data:
            {JSON.stringify(this.state.data, null, '  ')}
          </pre> }

        { data.winner
          ? <Restart {...game} {...data} />
          : <Options {...game} /> }
      </div>
    )
  }
}

export default RockPaperScissorsComponent

