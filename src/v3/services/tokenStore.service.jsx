import * as Keychain from 'react-native-keychain'

const getToken = async () => {
  const credentials = await Keychain.getGenericPassword()
  return credentials.password
}

const setToken = async (token) => {
  return await Keychain.setGenericPassword('token', token)
}

const deleteToken = async () => {
  return await Keychain.resetGenericPassword()
}

export default { getToken, setToken, deleteToken }