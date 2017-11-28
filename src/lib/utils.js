export const getSearchQuery = () => window.location.search.substr(1)

export const splitQuery = () => getSearchQuery().split('&')

export const location = () => window.location.host

export const getValue = e => e.target.value

export const onbeforeunload = fx => { window.onbeforeunload = e => { fx() } }
