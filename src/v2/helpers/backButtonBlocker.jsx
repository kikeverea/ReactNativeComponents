import { BackHandler } from 'react-native'

const blocker = () => true

export const blockBackButton = () => {
  BackHandler.addEventListener('hardwareBackPress', blocker)

}

export const unblockBackButton = () => {
  BackHandler.removeEventListener('hardwareBackPress', blocker)
}