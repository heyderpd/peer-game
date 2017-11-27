export const getSearchQuery = () => window.location.search.substr(1)

export const splitQuery = () => getSearchQuery().split('&')

export const getValue = e => e.target.value
