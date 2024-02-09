import axios from 'axios'
import tokenStoreService from '../services/tokenStore'

export const ReturnType = {
  Data: res => res.data,
  isOk: res => ({
    success: res.status >= 200 && res.status < 300,
    data: res.data
  })
}

export const axiosInstance = async () => {
  
  const token = await tokenStoreService.getToken()

  if (!token)
    throw Error('This service needs a token to run')
  
  return axios.create({
    baseURL: 'https://ondara.innobing.net/',
    headers: { Authorization: `${token}` },
    responseType: 'json'
  })
}

export const handleError = (error, returnType) => {
  let message
  
  if (error.response) {
    // the server responded with a status code other than 2xx
    message = error.response.data

    if (returnType === ReturnType.isOk) {
      // console.error(message)
      return returnType(error.response)
    }
  }
  else if (error.request) {
    message = 'No response was recevied'
  }
  else {
    message = 'Error while setting up the request'
  }

  console.error(message)
}

export const get = async (endpoint, params={}, returnType=ReturnType.Data) => {
  try {
    const axios = await axiosInstance()
    const res = await axios.get(endpoint, params)
    return returnType(res)
  }
  catch (e) {
    return handleError(e, returnType)
  }
}

export const post = async (endpoint, data, returnType=ReturnType.Data) => {
  try {
    const axios = await axiosInstance()
    const res = await axios.post(endpoint, data)
    return returnType(res)
  }
  catch (e) {
    return handleError(e, returnType)
  }
}

export const put = async (endpoint, data, returnType=ReturnType.isOk) => {
  try {
    const axios = await axiosInstance()
    const res = await axios.put(endpoint, data)
    return returnType(res)
  }
  catch (e) {
    return handleError(e, returnType)
  }
}