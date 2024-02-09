import axios from 'axios'
import tokenStore from '../services/tokenStore.service'
import { Error } from './errors'

export const ReturnType = {
  Data: res => res.data,
  isOk: res => ({
    success: res.status >= 200 && res.status < 300,
    data: res.data
  })
}

export const axiosInstance = async (endpoint, config) => {
  
  const returnType = config?.returnType || ReturnType.Data 
  const needsToken = config?.needsToken || true
  
  let headers = {}

  if (needsToken) {
    const token = await tokenStore.getToken()

    if (!token)
      throw Error('This service needs a token to run')
    
    headers = { Authorization: `${token}` }
  }
  
  const instance = axios.create({
    baseURL: 'https://wepickapp.innobing.net/',
    headers: headers,
    responseType: 'json'
  })

  instance.interceptors.response.use(
    res => returnType(res),
    error => {
      if (error.response?.status === 401 && config.authFailed) {
        handleError(error, endpoint, config)
        config.authFailed()
      }
      else return handleError(error, endpoint, config)
    }
  )

  return instance
}

export const get = async (endpoint, config) => {
  const axios = await axiosInstance(endpoint, config)
  return await axios.get(endpoint)
}

export const post = async (endpoint, data, config) => {
  const axios = await axiosInstance(endpoint, config)
  return await axios.post(endpoint, data)
}

export const put = async (endpoint, data, config) => {
  const axios = await axiosInstance(endpoint, config)
  return await axios.put(endpoint, data)
}

export const handleError = (error, endpoint, config) => {
  const returnType = config?.returnType || ReturnType.Data 

  let result
  
  if (error.response) {
    // the server replied with a status code other than 2xx
    result = parseError(endpoint, error)
  }
  else if (error.request) {
    // the server did no reply
    result = parseLog(endpoint, error, Error.NO_RESPONSE)
  }
  else {
    // exception setting up request
    result = parseLog(endpoint, error, Error.REQUEST_ERROR)
  }

  const { log, message } = result

  console.error(log, constrainLength(message))

  if (returnType === ReturnType.Data)
    return returnType({ data: { message } })
  else
    return returnType({ status: -1, data: message })
}

const ErrorIndex = {
  '400': Error.BAD_REQUEST,
  '401': Error.NO_SESSION,
  '403': Error.NO_SESSION,
  '404': Error.NO_RESOURCE,
  '422': Error.CANT_PROCESS,
}

const parseError = (endpoint, error) => {
  const status = error.response.status
  const data = constrainLength(error.response.data)

  const log = `${status} ${data} ${endpoint}`

  return { log, message: { error: ErrorIndex[status], message: data }}
}

const parseLog = (endpoint, error, log) => {
  return ({ log, message: `${endpoint} ${constrainLength(error)}` })
}

const constrainLength = data => {
  const stringified = JSON.stringify(data)

  return stringified.length > 500
    ? `${stringified.substring(0, 500).trim()} ...`
    : data
  }