import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import gameCore from '../../lib/game'
import Options from './options'
import Restart from './restart'
import CopyLink from './copy-link'
import Choosed from './choosed'
import { splitQuery } from '../../lib/utils'

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

    const middleComponent = function(){
      console.log(['middleComponent', !!data.winner, !!data.myChoose])
      if (data.winner) {
        return (<Restart {...game} {...data} />)

      } else if (data.myChoose) {
        return (<Choosed value={data.myChoose} />)

      } else {
        return (<Options {...game} />)
      }
    }

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

        { middleComponent() }
      </div>
    )
  }
}

export default RockPaperScissorsComponent

