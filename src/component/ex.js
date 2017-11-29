'use strict'
 
import React from 'react'

import { ThePeerSender, ThePeerReceiver, ThePeerStyle } from 'the-peer'
import { TheButton, TheButtonStyle } from 'the-button'
import { TheVideoStyle } from 'the-video'
 
import peerKey from '../peer-key.json'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {
      peerId: 'hoge12345',
      ready: false,
      audioEnabled: true,
      videoEnabled: true
    }
  }
 
  render () {
    const s = this
    const {state} = s
    const peerOptions = {
      port: 9000,
      host: 'localhost',
      debug: 3
    }
    const {
      ready,
      peerId,
      audioEnabled,
      videoEnabled 
    } = state
    return (
      <div>
        <ThePeerStyle/>
        <TheButtonStyle/>
        <TheVideoStyle/>
 
        <fieldset>
          <legend>Sender</legend>
          <div>
            <ThePeerSender {...{peerId, peerOptions, audioEnabled, videoEnabled}}
                           onReady={() => s.setState({ready: true})}
                           label='This is Me'
            />
          </div>
          <TheButton onClick={() => s.setState({peerId: 'hoge1234'})}>Start</TheButton>
          <TheButton onClick={() => s.setState({peerId: null})}>Stop</TheButton>
          <TheButton onClick={() => s.setState({audioEnabled: !s.state.audioEnabled})}>Toggle audio</TheButton>
          <TheButton onClick={() => s.setState({videoEnabled: !s.state.videoEnabled})}>Toggle video</TheButton>
        </fieldset>
        <br/>
        <fieldset>
          <legend>Receiver</legend>
          <div>
            {
              ready && (
                <div>
                  <ThePeerReceiver {...{peerId, peerOptions}}
                                   label='Some One Else'
                  />
                  <ThePeerReceiver {...{peerId, peerOptions}}
                  />
                </div>
              )
            }
          </div>
        </fieldset>
      </div>
 
    )
  }
}
 
export default ExampleComponent