const merge = (game, newValues) => ({
  ...game,
  ...newValues
})

const applyRules = (game, { action, payload }) => {
  const { started, myChoose, friendChoose } = game

  switch (action) {
    case 'friend-choose':
      return merge(game, { friendChoose: payload.choosed })

    default:
      return game
  }
}

export default applyRules
