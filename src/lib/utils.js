import randomstring from 'randomstring'

export const getSearchQuery = () => window.location.search

export const splitQuery = () => remember().substr(1).split('&')

export const getKeyOf = key => splitQuery().filter(n => key.test ? key.test(n) : key === n).pop()

export const getValueOf = key => {
  try {
    return getKeyOf(key).split('=').pop()

  } catch (error) {
    return ''
  }
}

export const hasJoin = () => !!getKeyOf(/join/)

export const getJoinId = () => getValueOf(/join/)

export const hasLog = () => !!getKeyOf('log')

export const location = () => window.location.origin

export const getValue = e => e.target.value

export const onbeforeunload = fx => { window.onbeforeunload = e => { fx() } }

const memo = {}

export const memorize = () => { memo.search = getSearchQuery() }

export const remember = () => memo.search

export const time = () => new Date().getTime()

export const randomId = () => randomstring.generate(5)
