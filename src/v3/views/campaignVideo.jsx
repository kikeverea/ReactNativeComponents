import { useLayoutEffect } from 'react'
import { lockToLandscapeLeft, lockToPortrait } from 'react-native-orientation-manager'
import { View, StatusBar } from 'react-native'

import Video from 'react-native-video'

const CampaignVideo = ({ video, onEnd }) => {

  useLayoutEffect(() => {
    if (video.aspectRatio === 'landscape'){
      lockToLandscapeLeft()
    }
    else {
      lockToPortrait()
    }
  },
  [])
  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <Video
        source={{ uri: `https://wepickapp.innobing.net/${video.url}`  }}
        onBuffer={this.onBuffer}                                                // Callback when remote video is buffering
        onError={this.videoError}                                               // Callback when video cannot be loaded
        fullScreen={ true }
        fullscreenOrientation='landscape'                                       // iOS
        style={{ flex: 1, backgroundColor: '#000000' }}
        onEnd={ onEnd }
        resizeMode='contain'
        />
    </View>
  )
}

export default CampaignVideo