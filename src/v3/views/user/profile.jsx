import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { me, editUser, getCountries, getTowns, getTownsOfCountry } from '../../services/user.service'
import { View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../../components/button.component'
import colors from '../../styles/colors'
import Text from '../../components/text.component'
import text from '../../styles/text'
import PickerDialog from '../../components/pickerDialog.component'
import SearchDialog from '../../components/searchDialog.component'
import useRequireAuth from '../../hooks/useRequireAuth'
import AlertDialog from '../../components/alertDialog.component'
import WepickView from '../../components/wepickView.component'

const genders = [
  { id: 1, name: 'Hombre', value: 'male'},
  { id: 2, name: 'Mujer', value: 'female'},
  { id: 3, name: 'Otro', value: 'other'},
]

const ProfileInfo = () => {

  const [user, setUser] = useState(null)
  
  const [nick, setNick] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [nif, setNif] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [country, setCountry] = useState('')
  const [town, setTown] = useState('')

  const[showCalendar, setShowCalendar] = useState(false)
  const[showCountries, setShowCountries] = useState(null)
  const[showTowns, setShowTowns] = useState(null)
  const[showGenders, setShowGenders] = useState(false)
  const[showNotEditable, setShowNotEditable] = useState(false)
  const[showNickInfo, setShowNickInfo] = useState(false)

  const [loading, setLoading] = useState(true)
  const [savingEnabled, setSavingEnabled] = useState(false)
  
  const authFailed = useRequireAuth()
  
  useEffect(() => {
    
    const init = async () => {
      const userProfile = await me(authFailed)
      const countries = await getCountries(authFailed)
      const towns = await getTowns(authFailed)

      const user = userProfile.user

      user.country = countries.find(country => country.id === user.country_id)
      user.town = towns.find(town => town.id === user.town_id)
      
      setUser(user)
      setNick(user.nick)
      setEmail(user.email)
      setName(user.name)
      setNif(user.nif)
      setGender(user.gender)
      setBirthdate(user.birthdate)
      setCountry(user.country)
      setTown(user.town)

      setLoading(false)
    }
    
    init()
  },
  [])

  const saveEditedUser = async () => {

    if (country && town === null) {
      Toast.show({
        type: 'error',
        text1: 'Debes seleccionar una ciudad',
        position: 'bottom',
        visibilityTime: 3000
      })
      return
    }

    const newUser = {
      ...user,
      nick,
      email,
      name,
      nif,
      gender,
      birthdate,
      country_id: country?.id,
      town_id: town?.id,
    }

    const edited = await editUser(newUser, authFailed)

    if (edited.success) {
      Toast.show({
        type: 'success',
        text1: 'Cambios guardados correctamente',
        position: 'bottom',
        visibilityTime: 3000
      })

      setSavingEnabled(false)
    }
    else {
      console.log('errr', edited.data.message.error[0])
      if (edited.data.message.error[0] == 'Nick has already been taken') {
        Toast.show({
          type: 'error',
          text1: 'El nick que intentas utilizar ya existe',
          position: 'bottom',
          visibilityTime: 3000
        });
      } else if (edited.data.message.error[0] == 'Nick Has cambiado el nick 3 veces. No puedes cambiarlo más.') {
        Toast.show({
          type: 'error',
          text1: 'Has cambiado el nick 3 veces. No puedes cambiarlo más.',
          position: 'bottom',
          visibilityTime: 3000
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'No se ha podido guardar los cambios',
          position: 'bottom',
          visibilityTime: 3000
        });
      }
      
    }
  }

  const formatDate = date => {
    return date ? new Date(date).toLocaleDateString() : null
  }

  const showCountriesDialog = async () => {
    const countries = await getCountries()
    setShowCountries(countries)
  }
  
  const showTownsDialog = async () => {
    const towns = await getTownsOfCountry(country, authFailed)
    setShowTowns(towns)
  }

  const updateValue = (newValue, setNewValue) => {
    setNewValue(newValue)

    if (!savingEnabled)
      setSavingEnabled(true)
  }

  const updateCountry = async newCountry => {
    if (newCountry.id !== country?.id) {
      setCountry(newCountry)
      setTown(null)
      setSavingEnabled(true)
    }
  }

  const updateTown = async newTown => {
    if (newTown.id !== town?.id) {
      setTown(newTown)
      setSavingEnabled(true)
    }
  }

  const updateGender = async newGender => {
    if (newGender.id !== gender?.id) {
      setGender(newGender.value)
      setSavingEnabled(true)
    }
  }

  const formatGender = gender => {
    switch (gender) {
      case 'male' :
        return 'Hombre'
      case 'female' :
        return 'Mujer'
      case 'other' :
        return 'Otro'
      default :
        return null
    }
  }

  return (
    <WepickView style={ styles.container } loading={ loading }>
      <View style={ styles.accountInfo }>
        <InfoInput
          placeholder='Añadir nick'
          item={{ name: 'Nick', value: nick }}
          showItemInfo={() =>  setShowNickInfo(true) }
          onInfoChanged={ newValue => updateValue(newValue, setNick) }
        />
        <InfoInput
          placeholder='Añadir correo'
          item={{ name: 'Correo', value: email }}
          onInfoChanged={ newValue => updateValue(newValue, setEmail) }
        />
        <InfoInput
          placeholder='Añadir nombre'
          item={{ name: 'Nombre', value: name }}
          onInfoChanged={ newValue => updateValue(newValue, setName) }
        />
        <InfoInput
          placeholder='Añadir NIF'
          item={{ name: 'NIF', value: nif }}
          onInfoChanged={ newValue => updateValue(newValue, setNif) }
        />
        <InfoSelect
          item={{ name: 'Sexo', value: formatGender(gender), placeholder: 'Seleccionar género' }}
          editable={ gender === null || gender === undefined }
          onPress={ () => setShowGenders(true) }
          notEditable={ () => setShowNotEditable(true) }
          />
        <InfoSelect
          item={{ name: 'F. nacimiento', value: formatDate(birthdate), placeholder: 'Seleccionar fecha' }}
          editable={ birthdate === null || birthdate === undefined }
          onPress={ () => setShowCalendar(true) }
          notEditable={ () => setShowNotEditable(true) }
        />
        <InfoSelect
          editable
          item={{ name: 'País', value: country?.name, placeholder: 'Seleccionar país' }}
          onPress={ showCountriesDialog }
        />
        <InfoSelect
          editable
          item={{ name: 'Ciudad', value: town?.name, placeholder: 'Seleccionar ciudad' }}
          onPress={ showTownsDialog }
        />
      </View>
      <View style={ styles.buttonContainer }>
        <Button
          text='GUARDAR CAMBIOS'
          style={ styles.deleteButton }
          disabled={ !savingEnabled }
          press={ () => saveEditedUser(user) }
        />
      </View>
      { showCountries && 
        <PickerDialog
          visible={ true }
          title='PAISES'
          options={ showCountries }
          onOptionSelected={ updateCountry }
          dismissDialog={ () => setShowCountries(null) }
        />
      }
      { showTowns && 
        <SearchDialog
          visible={ true }
          title='CIUDADES'
          searchBar={ true }
          options={ showTowns }
          onOptionSelected={ updateTown }
          dismissDialog={ () => setShowTowns(null) }
        />
      }
      { showGenders && 
        <PickerDialog
          visible={ gender }
          title='GÉNEROS'
          options={ genders }
          onOptionSelected={ updateGender }
          dismissDialog={ () => setShowGenders(false) }
        />
      }
      { showNickInfo && 
        <AlertDialog
          info={{ title: 'NICK', info: ['Este apartado puede ser editado un máximo de 3 veces'] }}
          onClose={ () => setShowNickInfo(false) }
        />
      }
      { showNotEditable && 
        <AlertDialog
          info={{ title: 'NO EDITABLE', info: ['Este apartado no puede ser editado, o ha sido editado el máximo de veces permitidas'] }}
          onClose={ () => setShowNotEditable(false) }
        />
      }
      <DateTimePickerModal
        isVisible={ showCalendar && !birthdate }
        mode='date'
        onConfirm={ date => updateValue(date, setBirthdate) }
        onHide={() => setShowCalendar(false) }
        onCancel={() => setShowCalendar(false) }
      />
    </WepickView>
  )
}

const InfoItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={ styles.infoItem }
      activeOpacity={ 0.6 }
      onPress={ onPress }
    >
      <Text style={ styles.itemName }>{ item.name }</Text>
      { item.value && <Text style={ styles.itemValue }>{ item.value }</Text>}
    </TouchableOpacity>
  )
}

const InfoSelect = ({ item, editable, showNotEditable, onPress }) => {
  
  const [loading, setLoading] = useState(false)

  const startSelect = async () => {
    try {
      setLoading(true)
      await onPress()
    }
    finally {
      setLoading(false)
    }
  }

  const valueStyle = item.value ? styles.itemValue : styles.placeholder
  const value = item.value ? item.value : item.placeholder

  return (
    <View style={ styles.infoItem }>
      <Text style={ styles.itemName }>{ item.name }</Text>
      { editable
        ? loading
          ? <ActivityIndicator size='small' color={ colors.accent } />
          : <TouchableOpacity
              activeOpacity={ 0.6 }
              onPress={ startSelect }
            >
              <View style={ styles.valueLayout }>
                <Text style={ valueStyle }>{ value }</Text>
              </View>
            </TouchableOpacity>
        
        : <NotEditable item={ item } onPress={ showNotEditable }/>
      }
    </View>
  )
}

const InfoInput = ({ placeholder, item, editable=true, showItemInfo, onInfoChanged }) => {
  return (
    <View style={ styles.infoItem }>
      <Text style={ styles.itemName }>{ item.name }</Text>
      { editable
        ? <View style={ styles.itemValueInfo }>
            { showItemInfo && 
              <TouchableOpacity
                style={ styles.infoIcon }
                activeOpacity={ 0.6 }
                onPress={ showItemInfo }
              >
                <Icon name='information-outline' size={ 20 } color={ colors.accent } />
              </TouchableOpacity>}
            <TextInput
                style={[ styles.inputText, styles.valueLayout ]}
                value={ item.value }
                placeholder={ placeholder }
                placeholderTextColor={ colors.textSecondary }
                onChangeText={ onInfoChanged }
              />
          </View>
        : <NotEditable item={ item } onPress={ () => setShowNotEditable(true) }/>
      }
    </View>
  )
}

const NotEditable = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={ styles.infoItem }
      onPress={ onPress }  
    >
      <Text style={ styles.itemValue }>{ item.value }</Text>
    </TouchableOpacity>
  )
}

export default ProfileInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%'
  },
  title: {
    backgroundColor: 'lightgray',
    padding: 8,
    fontSize: 16,
    width: '100%',
    textAlign: 'center'
  },
  accountInfo: {
    paddingBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 38,
  },
  itemName: {
    fontWeight: 'regular',
    fontSize: text.size.header
  },
  itemValue: {
    fontSize: text.size.header,
  },
  valueLayout: {
    height: '100%',
    justifyContent: 'center',
  },
  itemValueInfo: {
    flexDirection: 'row',
  },
  infoIcon: {
    paddingLeft: 8,
    paddingVertical: 4,
    paddingRight: 4,
  },
  placeholder: {
    fontSize: text.size.header,
    color: colors.textSecondary
  },
  inputText: {
    color: colors.accent,
    fontFamily: 'Aero Matics Light',
    fontSize: text.size.header,
    textAlign: 'right',
    padding: 0 // overrides TextInput´s default padding to prevent text cut-off
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16
  },
  deleteButton: {
    width: 220,
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30
  }
})
