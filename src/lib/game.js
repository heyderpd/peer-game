import Connections from 'easy-p2p'
import { equals } from 'ramda'

import peerKey from '../peer-key.json'
import { hasJoin, getJoinId, splitQuery, onbeforeunload, time, randomId } from '../lib/utils'
import applyRules from './rules'

const pool = {}

const gameCore = onChangeState => {
  const state = {
    conn: null,
    onChangeState: null,
    mode: '',
    id: '',
    game: {}
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
    state.game.id = object.getId()
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

  const _addToPool = Package => {
    pool[Package.pkgId] = { Package, time: time() }
  }

  const _getFromPool = msg => {
    const item = pool[msg.pkgId]
    console.log('_getFromPool', pool, item, msg)
    if (item) {
      return item.Package
    }
  }

  const _send = (action, payload = {}) => {
    const Package = {
      pkgId: randomId(),
      action,
      payload
    }
    _addToPool(Package)
    state.conn.send(Package)
  }

  const _confirmeReceive = Package => {
    if (Package.pkgId) {
      state.conn.send({ received: true, pkgId: Package.pkgId })
    }
  }

  const _onData = data => {
    console.log('_onData', data)
    if (data.received && data.pkgId) {
      _evaluateRules(_getFromPool(data))

    } else {
      _confirmeReceive(data)
      _evaluateRules(data)
    }
  }

  const _evaluateRules = data => {
    console.log('_evaluateRules', data)
    const game = applyRules(state.game, data)
    if (!equals(state.game, game)) {
      state.game = game
      _updateState()
      return true
    }
  }

  const sendChoose = choosed => {
    const payload = { id: object.getId(), choosed }
    _send('choose', payload)
  }

  const sendRestart = () => {
    _send('restart')
  }

  const object = {}

  object.getJoinId = () => state.id

  object.getId = () => state.conn.getId()

  object.chooseRock = () => sendChoose('rock')

  object.choosePaper = () => sendChoose('paper')

  object.chooseScissors = () => sendChoose('scissors')

  object.sendRestart = () => sendRestart()

  _initialize(onChangeState)

  return object
}

export default gameCore