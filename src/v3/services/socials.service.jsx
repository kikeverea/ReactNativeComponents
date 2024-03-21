import { get } from '../helpers/axios.helper'

export const getPosts = async authFailed => {
  return await get('/posts.json', { authFailed })
}