import React, { Component } from 'react'

import gameCore from '../lib/game'

class RPSComponent extends Component {

  constructor() {
    super()
    this.state = {
      game: null,
      data: ''
    }
  }

  componentWillMount() {
    this.setState({
      game: new gameCore(this.changeState.bind(this))
    })
  }

  changeState(data) {
    console.log('-*-changeState', data)
    this.setState({ data })
  }

  render() {
    const game = this.state.game

    return (
      <div>
        <h1>game test</h1>
        <a href={`http://localhost:3000/rps?join&${game.getId()}`}>join-link</a>
        <br/>
        <div>
          <button onClick={game.chooseRock}>rock</button>
          <button onClick={game.choosePaper}>paper</button>
          <button onClick={game.chooseScissors}>scissors</button>
        </div>
        <pre>
          {JSON.stringify(this.state.data, null, '  ')}
        </pre>
      </div>
    )
  }
}

export default RPSComponent
