import { Buffer } from 'buffer'

export const setToken = (token) => {
  window.localStorage.setItem('local-user-Token', token)
}

export const getToken = () => window.localStorage.getItem('local-user-Token')

export const getPayLoad = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayLoad()
  if (!payload) return
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

export const userIsOwner = (item) => {
  const payload = getPayLoad()
  if (!payload) return false
  return payload.userId === item.createdBy.toString()
}

