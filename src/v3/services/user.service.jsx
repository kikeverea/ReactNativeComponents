import { ReturnType, get, post } from '../helpers/axios.helper'

export const me = async authFailed => {
  return await get('/get_user_with_interests.json', { authFailed })
}

export const sendRecoverPassword = async (email, authFailed) => {
  return true
}

export const sendInvitation = async (email, authFailed) => {
  return await post('/invitations.json', { email: email }, { returnType: ReturnType.isOk, authFailed })
}

export const getInterests = async authFailed => {
  return await get('/interests.json', { authFailed })
}

export const getDaysLeftToEditInterests = async authFailed => {
  return 15
  // return await get('/days_left_to_edit_interests.json', { authFailed })
}

export const saveInterests = async (interests, authFailed) => {
  return await post('/save_user_interests.json', { interests: interests }, { returnType: ReturnType.isOk, authFailed })
}

export const selectInterest = async (interestId, authFailed) => {
  return await post('/create_user_interest.json', { id: interestId }, { returnType: ReturnType.isOk, authFailed })
}

export const unselectInterest = async (interestId, authFailed) => {
  return await post('/delete_user_interest.json', { id: interestId }, { returnType: ReturnType.isOk, authFailed })
}

export const getCountries = async authFailed => {
  return await get('/countries.json', { authFailed })
}

export const getTowns = async authFailed => {
  return await get('/towns.json', { authFailed })
}

export const getTownsOfCountry = async (country, authFailed) => {
  return await post('/get_towns_of_country.json', { country_id: country.id }, { authFailed })
}

export const editUser = async (editedUser, authFailed) => {
  return await post('/update_user_profile.json', { user: editedUser }, { returnType: ReturnType.isOk, authFailed })
}

export const getCredit = async authFailed => {
  return await get('/get_credit.json', { authFailed })
}

export const getPendingRequests = async authFailed => {
  return await get('/my_requests.json', { authFailed })
}

export const getIBAN = async authFailed => {
  return await get('/get_iban.json', { authFailed })
}

export const redeemCredit = async (iban, authFailed) => {
  return await post('/request_withdraw.json', { iban: iban }, { returnType: ReturnType.isOk, authFailed })
}

export const getMaxTime = async authFailed => {
  return await get('/get_max_time_views.json', { authFailed })
}

export const getUsedTime = async authFailed => {
  return await get('/get_used_time.json', { authFailed })
}

export const getParticipationTime = async authFailed => {
  return await get('/get_total_time_for_participation.json', { authFailed })
}

export const getVisualizedTimeForNextParticipation = async authFailed => {
  return await get('/get_time_to_next_participation.json', { authFailed })
}