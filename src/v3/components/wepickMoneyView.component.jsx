import background from '../assets/img/background_redeem.jpg'
import WepickView from './wepickView.component'

const WepickMoneyView = ({ style, children, loading }) => {
  return (
    <WepickView loading={ loading } background={ background } style={ style }>
      { children }
    </WepickView>
  )
}

export default WepickMoneyView