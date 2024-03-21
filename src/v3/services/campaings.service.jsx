import { ReturnType, get, post } from "../helpers/axios.helper"

export const getCampaigns = async authFailed => {
  return await get('/get_campaigns.json', { authFailed })
}

export const sendControlAnswerResponse = async (answer, campaignId, authFailed) => {
  console.log('SENDING ANSWER', answer, 'OF CAMPAIGN', campaignId)
  
  return await post(
    '/create_user_response.json',
    { answer: answer, campaign_id: campaignId },
    { returnType: ReturnType.isOk, authFailed }
  )
}

export const getJackpot = async authFailed => {
  return await get('/get_lottery_data.json', { authFailed })
}