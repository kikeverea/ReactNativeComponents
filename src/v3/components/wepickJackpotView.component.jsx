import background from '../assets/img/jackpot_background.jpg'
import WepickView from './wepickView.component'

const WepickJackpotView = ({ style, children }) => {
  return (
    <WepickView background={ background } style={ style } resizeMode='cover'>
      { children }
    </WepickView>
  )
}

export default WepickJackpotView