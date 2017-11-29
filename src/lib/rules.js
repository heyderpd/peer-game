const waiting = 'waiting'
const started = 'started'
const showResult = 'showResult'

const rock = 'rock'
const paper = 'paper'
const scissors = 'scissors'

const whatWin = (choiceA, choiceB) => {
  switch (choiceA) {
    case rock:
      return choiceB === scissors

    case paper:
      return choiceB === rock

    case scissors:
      return choiceB === paper

    default:
      return false
  }
}

const whoPlayerWin = (playerA, playerB) => {
  if (whatWin(playerA, playerB)) {
    return 'you win'

  } else if (whatWin(playerB, playerA)) {
    return 'friend win'

  } else {
    return 'draw'
  }
}

const initialState = {
  mode: waiting,
  winner: '',
  myChoose: '',
  friendChoose: ''
}

const initializeState = state => {
  if (state === null) {
    return initialState

  } else {
    return state
  }
}

const merge = (state, newValues) => ({
  ...state,
  ...newValues
})

const ifCant = rule => (state, newState) => {
  if (rule) {
    return merge(state, newState)

  } else {
    return state
  }
}

const applyRules = (state = initialState, { action, payload }) => {
  state = initializeState(state)
  const { mode, myChoose, friendChoose } = state

  switch (action) {
    case 'easy-p2p:info':
      return ifCant(mode === waiting && payload.title === 'on.connection')(
        state,
        { mode: started })

    case 'i-restart':
    case 'friend-restart':
      return ifCant(mode === showResult)(
        state,
        initialState)

    case 'i-choose':
      return ifCant(mode === started)(
        state,
        { myChoose: payload.choosed })

    case 'friend-choose':
      return ifCant(mode === started)(
        state,
        { friendChoose: payload.choosed })

    case 'test-end-game':
      return ifCant(mode === started && myChoose && friendChoose)(
        state,
        { mode: showResult,
          winner: whoPlayerWin(myChoose, friendChoose) })

    default:
      return state
  }
}

export default applyRules
