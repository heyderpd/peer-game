import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import gameCore from '../../lib/game'
import Options from './options'
import Restart from './restart'
import CopyLink from './copy-link'
import Choosed from './choosed'
import { hasJoin, hasLog } from '../../lib/utils'

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
      host: !hasJoin(),
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
      console.log(['middleComponent', data])
      if (data.mode === 'waiting') {
        return (<span> waiting a friend join... </span>)

      } else if (data.winner) {
        return (<Restart {...game} {...data} />)

      } else if (data.myChoose) {
        return (
          <div>
            <span> waiting a friend choose... </span>
            <Choosed card={data.myChoose} />
          </div>
        )

      } else {
        return (<Options {...game} />)
      }
    }

    return (
      <div className="game">
        <h1>Rock Paper Scissors</h1>
        <h3>
          { host
            ? `Hosting with id [${game.getId()}]`
            : `Join with id [${game.getId()}]` }
        </h3>

        { host &&
          <CopyLink {...game} /> }

        <div className="middle">
          {middleComponent()}
        </div>

        { host && hasLog() &&
          <pre>
            debug:
            {JSON.stringify(this.state, null, '  ')}
          </pre> }
      </div>
    )
  }
}

export default RockPaperScissorsComponent

