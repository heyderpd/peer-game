import Connections from 'easy-p2p'
import { equals } from 'ramda'

import peerKey from '../peer-key.json'
import { splitQuery } from '../lib/utils'
import applyRules from './rules'

const gameCore = onChangeState => {
  const state = {
    conn: null,
    onChangeState: null,
    mode: '',
    id: '',
    game: null
  }

  const _initialize = onChangeState => {
    state.onChangeState = onChangeState
    const conn = new Connections(peerKey)
    conn.setOnData(_onData)
    state.conn = conn
    _startConn()
  }

  const _startConn = () => {
    const [ mode, id ] = splitQuery()
    state.mode = mode
    state.id = id

    if (state.mode === 'join') {
      state.conn.join(state.id)
    } else {
      state.conn.host()
    }
  }

  const _testState = () => {
    _onData({ action: 'test-end-game' })
  }

  const _updateState = () => {
    console.log('_updateState', state.game)
    _testState()
    if (typeof(state.onChangeState) === 'function') {
      state.onChangeState(state.game)
    }
  }

  const _onData = data => {
    const game = applyRules(state.game, data)
    console.log('_onData', [state.game, game, data])
    if (!equals(state.game, game)) {
      state.game = game
      _updateState()
      console.log('diff!')
      return true
    }
  }

  const sendChoose = choosed => {
    console.log('sendChoose', choosed, state.game)
    const payload = { choosed }
    if(_onData({ action: 'i-choose', payload })) {
      state.conn.send({ action: 'friend-choose', payload })
    }
  }

  const sendRestart = () => {
    if(_onData({ action: 'i-restart' })) {
      state.conn.send({ action: 'friend-restart' })
    }
  }

  const object = {}

  object.getId = () => state.conn.getId()

  object.chooseRock = () => sendChoose('rock')

  object.choosePaper = () => sendChoose('paper')

  object.chooseScissors = () => sendChoose('scissors')

  object.sendRestart = () => sendRestart()

  _initialize(onChangeState)

  return object
}

export default gameCore