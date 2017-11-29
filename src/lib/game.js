import Connections from 'easy-p2p'
import { equals } from 'ramda'

import peerKey from '../peer-key.json'
import { hasJoin, getJoinId, splitQuery, onbeforeunload } from '../lib/utils'
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
    onbeforeunload(conn.abort)
    state.conn = conn
    _startConn()
  }

  const _startConn = () => {
    state.id = getJoinId()
    if (hasJoin()) {
      state.mode = 'join'
      state.conn.join(state.id)
    } else {
      state.mode = 'host'
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
    console.log('_onData', data)
    const game = applyRules(state.game, data)
    if (!equals(state.game, game)) {
      state.game = game
      _updateState()
      return true
    }
  }

  const sendChoose = choosed => {
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