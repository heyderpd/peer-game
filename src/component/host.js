import React, { Component } from 'react'
import Connections from 'easy-p2p'

import peerKey from '../peer-key.json'

const conn = new Connections(peerKey)

class HostComponent extends Component {

  constructor() {
    super()
    
    conn
      .host()
      .setOnData(this.changeState.bind(this))

    this.state = {
      id: conn.getId(),
      data: ''
    }
  }

  changeState(data) {
    this.setState({ data })
  }

  render() {
    return (
      <div>
        <h1>host</h1>
        <a href={`http://localhost:3000/join?${this.state.id}`}>join-link</a>
        <br/>
        <div>
          <button onClick={() => conn.send('uala')}>send uala</button>
          <input value={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default HostComponent
