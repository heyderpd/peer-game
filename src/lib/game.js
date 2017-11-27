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
    game: {
      started: true,
      myChoose: '',
      friendChoose: ''
    }
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
    console.log(mode, id, state.conn)
  }

  const _updateState = () => {
    console.log('_updateState', state.game)
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
    }
  }

  const sendChoose = choosed => {
    console.log('sendChoose', choosed, state.game)
    state.game.myChoose = choosed
    state.conn.send({
      action: 'friend-choose',
      payload: { choosed }
    })
    _updateState()
  }

  const object = {}

  object.getId = () => state.conn.getId()

  object.chooseRock = () => sendChoose('rock')

  object.choosePaper = () => sendChoose('paper')

  object.chooseScissors = () => sendChoose('scissors')

  _initialize(onChangeState)

  return object
}

export default gameCore