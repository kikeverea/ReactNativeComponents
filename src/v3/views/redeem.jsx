import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { getCredit, getPendingRequests, redeemCredit, getIBAN } from '../services/user.service'
import { useEffect, useState } from 'react'
import WepickMoneyView from '../components/wepickMoneyView.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import icoalImage from '../assets/icons/icoal.png'
import AppBar from '../components/appbar.component'
import { formatCurrency, formatDate, formatDecimal } from '../helpers/numberFormat'
import colors from '../styles/colors'
import IconButton from '../components/iconButton.component'
import useRequireAuth from '../hooks/useRequireAuth'
import Text from '../components/text.component'
import text from '../styles/text'
import WepickDialog from '../components/wepickDialog.component'
import InputDialog from '../components/inputDialog.component'
import { ActivityIndicator } from 'react-native'
import { iCoalsToEuros } from '../helpers/iCoalConverter.helper'
import { toastError, toastSuccess } from '../helpers/toast.helper'

const PENDING_REQUEST_ERROR = 'No puedes canjear nuevamente hasta que tu solicitud anterior sea aprobada'
const NOT_ENOUGH_CREDITS_ERROR = 'Debes tener mínimo 1 iCoal para poder canjear'

const Redeem = () => {

  const [loading, setLoading] = useState(true)
  const [creditCoals, setCreditCoals] = useState(0)
  const [creditEuros, setCreditEuros] = useState(0)
  const [pendingRequest, setPendingRequest] = useState(null)
  const [IBAN, setIBAN] = useState('')
  const[showPendingRequest, setShowPendingRequest] = useState(false)
  const[redeemError, setRedeemError] = useState(false)
  const[showIBAN, setShowIBAN] = useState(false)
  
  const authFailed = useRequireAuth()

  useEffect(() => {

    const init = async () => {
      const creditResponse = await getCredit(authFailed)
      const IBAN = await getIBAN(authFailed)
      const pendingRequests = await getPendingRequests(authFailed)

      const credit = parseFloat(creditResponse)

      setCreditCoals(credit)
      setCreditEuros(iCoalsToEuros(credit))
      setIBAN(IBAN)
      setPendingRequest(pendingRequests[0])

      setLoading(false)
    }

    init()

  }, [])
  
  const redeem = () => {
    if (creditCoals === 0) {
      console.log();
      setRedeemError(NOT_ENOUGH_CREDITS_ERROR)
    }
    else if (pendingRequest) {
      setRedeemError(PENDING_REQUEST_ERROR)
    }
    else {
      setShowIBAN(true)
    }
  }
  
  const sendWithdrawRequest = async iban => {
    setShowIBAN(false)
  
    if (!iban)
      return
    
    const result = await redeemCredit(iban, authFailed)
  
    if (result.success) {
      toastSuccess('Tu solicitud ha sido enviada correctamente')
      
      const pendingRequests = await getPendingRequests()
      setPendingRequest(pendingRequests[0])
    }
    else
      toastError('No se ha podido enviar la solicitud. Inténtalo más tarde')
  }
  
  const renderPendingRequestMessage = ({ created_at, amount }) => {
    return (
      <View style={ styles.pendingRequestDialogContent }>
        <View style={ styles.pendingRequestMessageContainer }>
          <Text style={ styles.pendingRequestMessage }>Creada: </Text>
          <Text style={ styles.pendingRequestMessage }>{ formatDate(created_at) }</Text>
        </View>
        <View style={ styles.pendingRequestMessageContainer }>
          <Text style={ styles.pendingRequestMessage }>Monto:</Text>
          <Text style={ styles.pendingRequestMessage }>{ `${formatDecimal(amount)} iCoals` }</Text>
        </View>
      </View>
    )
  }

  return (
    <WepickMoneyView style={ styles.container }>
      <View style={ styles.content }>
        { pendingRequest &&
          <IconButton
            style={ styles.pendingRequestContainer }
            text='Tienes una solicitud pendiente'
            iconLeft={ <Icon name='exclamation-thick' style={ styles.exclamation } size={ 24 } color={ colors.primary } /> }
            textStyle={ styles.pendingRequest }
            press={ () => setShowPendingRequest(true) }
          />
        }
        <View style={styles.dataContainer}>
          <View style={ styles.imageContainer }>
            <Image source={ icoalImage } style={ styles.icoal } resizeMode='contain'/>       
          </View>

          <View style={styles.containerText}>
            <Text style={{fontSize: 30, fontWeight: 'regular', color: colors.primaryDark}}>Tienes ${formatDecimal(creditCoals)} iCoals</Text>
            <Text style={{fontSize: 30, fontWeight: 'regular', marginTop: 10, color: colors.primaryDark}}>Equivalentes a ${formatCurrency(creditEuros, '€')}</Text>
          </View>
        </View>
      </View>
      <IconButton
        text='CANJEAR'
        iconLeft={ <Image style={ styles.buttonIcon } source={ require('../assets/icons/redeem2.png')} />}
        style={ styles.button }
        textStyle={ styles.buttonLabel }
        press={ redeem }
      />
      { showPendingRequest &&
        <WepickDialog
          visible={ true }
          title='SOLICITUD PENDIENTE'
          width='80%'
          content={ renderPendingRequestMessage(pendingRequest) }
          closeButton='default'
          onClose={ () => setShowPendingRequest(false) }
        />
      }
      { redeemError &&
        <WepickDialog
          visible={ true }
          title='¡LO SENTIMOS!'
          width='80%'
          content={ <Text style={ styles.cantRedeem }>{ redeemError }</Text> }
          closeButton='default'
          onClose={ () => setRedeemError('') }
        />
      }
      { showIBAN &&
        <InputDialog
          title='NÚMERO IBAN'
          initialText={ IBAN }
          placeholder='introduce tu número IBAN'
          validation={ IBANValidation }
          onClose={ sendWithdrawRequest }
        />
      }
    </WepickMoneyView>
  )
}

export default Redeem


const IBANValidation = iban => {
  if (!iban || iban.trim().length === 0)
    return 'Campo obligatorio'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16 ,
    paddingHorizontal: '4%',
  },
  content: {
    flex: 1
  },
  pendingRequestContainer: {
    height: 'auto',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
    backgroundColor: colors.primary,
    borderRadius: 10
  },
  pendingRequest: {
    fontSize: text.size.button
  },
  exclamation: {
    backgroundColor: colors.accent,
    padding: 6,
    borderRadius: 18,
    overflow: 'hidden'
  },
  pendingRequestDialogContent: {
    padding: 8,
    width: '90%',
    alignSelf: 'center'
  },
  pendingRequestMessageContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  pendingRequestMessage: {
    fontSize: 18,
    lineHeight: 28,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icoal: {
    flex: 1
  },
  dataContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: colors.primaryTransparent
  },
  button: { 
    height: 'auto',
    width: '85%',
    alignSelf: 'center',
    backgroundColor: colors.accent,
  },
  buttonIcon: {
    width: 60,
    height: 60,
  },
  buttonLabel: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: colors.darkButton,
    fontSize: 38
  },
  cantRedeem: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 22,
    padding: 8
  },
  containerText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
})