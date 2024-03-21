import { useState, useEffect } from 'react'
import CampaignVideo from './campaignVideo'
import VideoQuestion from './videoQuestion'
import { blockBackButton, unblockBackButton } from '../helpers/backButtonBlocker'

const Campaigns = ({ navigation, route }) => {

  const campaigns = route.params.campaigns

  const [activeCampaignInd, setActiveCampaignInd] = useState(0)
  const [playVideo, setPlayVideo] = useState(true)

  useEffect(() => {
    blockBackButton()
    return unblockBackButton
  },
  [])

  const handleVideoEnd = () =>
    setPlayVideo(false)

  const handleReplayRequest = () =>
    setPlayVideo(true)

  const playNextVideo = () => {
    const nextCampaign = activeCampaignInd + 1

    if (nextCampaign < campaigns.length) {
      setActiveCampaignInd(nextCampaign)  
      setPlayVideo(true)
    }
    else {
      navigation.navigate('home')
    }
  }

  const campaign = campaigns[activeCampaignInd]

  console.log('campaign', campaign)

  return (
    playVideo
      ? <CampaignVideo
          video={{ url: campaign.video.url, aspectRatio: campaign.video_ar }}
          onEnd={ handleVideoEnd }
        />
      : <VideoQuestion
          question={ campaigns[activeCampaignInd].question[0] }
          campaignId={ campaign.id }
          isLast={ activeCampaignInd === campaigns.length -1 }
          onReplayRequest={ handleReplayRequest }
          playNextVideo={ playNextVideo }
        />
  )
}

export default Campaigns