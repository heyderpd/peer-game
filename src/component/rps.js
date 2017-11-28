import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import gameCore from '../lib/game'
import { splitQuery, location } from '../lib/utils'

class RPSComponent extends Component {

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
          <div>
              <CopyToClipboard text={`${location()}/rps?join&${game.getId()}`}>
                <button>copy link and send to a friend!</button>
              </CopyToClipboard>
            <pre>
              data:
              {JSON.stringify(this.state.data, null, '  ')}
            </pre>
          </div> }

        { data.winner
          ? (
            <div>
              {data.winner}!
              <button onClick={game.sendRestart}>restart</button>
            </div>
          )
          : (
            <div>
              <button onClick={game.chooseRock}>rock</button>
              <button onClick={game.choosePaper}>paper</button>
              <button onClick={game.chooseScissors}>scissors</button>
            </div>
          ) }
      </div>
    )
  }
}

export default RPSComponent
