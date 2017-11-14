import React, { Component } from 'react'
import Connections from 'easy-p2p'

import peerKey from '../peer-key.json'
import { getSearchQuery, getValue } from '../lib/utils'

const conn = new Connections(peerKey)

class JoinComponent extends Component {

  constructor() {
    super()
    this.state = {
      joinTo: getSearchQuery(),
      data: ''
    }

console.log('fg4d564g56df4g56df4g56df4g56df4g56df4g56df456gd====================', peerKey)
    

    this.startJoin()
  }

  changeJoinTo(e) {
    this.setState({
      joinTo: getValue(e)
    })
  }

  changeState(data) {
    this.setState({ data })
  }

  startJoin() {
    if (this.state.joinTo) {
      conn
      .join(this.state.joinTo)
      .setOnData(this.changeState.bind(this))
    }
  }

  render() {
    return (
      <div>
        <h1>join</h1>
        <div>
          <input value={this.state.joinTo} onChange={this.changeJoinTo.bind(this)} />
          <button onClick={this.startJoin.bind(this)}>JOIN</button>
        </div>
        <br/>
        <div>
          <button onClick={() => conn.send('xabla')}>send xabla</button>
          <input value={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default JoinComponent
