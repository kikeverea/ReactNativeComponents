import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import Button from './button.component'
import colors from '../styles/colors'

import Text from './text.component'
import text from '../styles/text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PickerDialog from './pickerDialog.component'
import { editUser, getCountries, getTownsOfCountry } from '../services/user.service'
import Toast from 'react-native-toast-message'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const genders = [
  { id: 1, name: 'Hombre', value: 'male'},
  { id: 2, name: 'Mujer', value: 'female'},
  { id: 3, name: 'Otro', value: 'other'},
]

const UserInfo = ({ user }) => {

  const [nick, setNick] = useState(user.nick)
  const [email, setEmail] = useState(user.email)
  const [name, setName] = useState(user.name)
  const [nif, setNif] = useState(user.nif)
  const [gender, setGender] = useState(user.gender)
  const [birthdate, setBirthdate] = useState(user.birthdate)
  const [country, setCountry] = useState(user.country)
  const [town, setTown] = useState(user.town)
  const [password, setPassword] = useState(user.password)

  const[showCalendar, setShowCalendar] = useState(false)
  const[showCountries, setShowCountries] = useState(null)
  const[showTowns, setShowTowns] = useState(null)
  const[showGenders, setShowGenders] = useState(false)

  const [savingEnabled, setSavingEnabled] = useState(false)

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

    const edited = await editUser(newUser)

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
      Toast.show({
        type: 'error',
        text1: 'No se ha podido guardar los cambios',
        position: 'bottom',
        visibilityTime: 3000
      });
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
    const towns = await getTownsOfCountry(country)
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

  const updateBirthdate = date => {
    updateValue(date, setDate)
    setShowCalendar(false)
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
        return 'Seleccionar género'
    }
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.accountInfo }>
        <InfoInput
          placeholder='Añadir nick'
          item={{ name: 'Nick', value: nick }}
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
          item={{ name: 'Sexo', value: formatGender(gender) }}
          onPress={ () => setShowGenders(true) }
          />
        <InfoSelect
          item={{ name: 'F. nacimiento', value: formatDate(birthdate), placeholder: 'Seleccionar fecha' }}
          onPress={ () => setShowCalendar(true) }
        />
        <InfoSelect
          item={{ name: 'País', value: country ? country.name : 'Seleccionar país' }}
          onPress={ showCountriesDialog }
        />
        <InfoSelect
          item={{ name: 'Ciudad', value: town ? town.name : 'Seleccionar ciudad' }}
          onPress={ showTownsDialog }
        />
        <InfoItem item={{ name: 'Datos bancarios' }} />
        <InfoInput
          item={{ name: 'Contraseña', value: password }}
          onInfoChanged={ newValue => updateValue(newValue, setPassword) }
        />
        <Button
          text='GUARDAR CAMBIOS'
          style={ styles.deleteButton }
          disabled={ !savingEnabled }
          press={ () => saveEditedUser(user) }>
        </Button>
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
        <PickerDialog
          visible={ true }
          title='CIUDADES'
          options={ showTowns }
          onOptionSelected={ updateTown }
          dismissDialog={ () => setShowTowns(null) }
        />
      }
      { showGenders && 
        <PickerDialog
          visible={ true }
          title='GÉNEROS'
          options={ genders }
          onOptionSelected={ updateGender }
          dismissDialog={ () => setShowGenders(false) }
        />
      }
      <DateTimePickerModal
        isVisible={ showCalendar }
        mode='date'
        onConfirm={ date => updateValue(date, setBirthdate) }
        onHide={() => setShowCalendar(false) }
        onCancel={() => setShowCalendar(false) }
      />
    </View>
  )
}

const InfoItem = ({ item }) => {
  return (
    <View style={ styles.infoItem }>
      <Text style={ styles.itemName }>{ item.name }</Text>
      <Text style={ styles.itemValue }>{ item.value }</Text>
    </View>
  )
}

const InfoSelect = ({ item, placeholder, onPress }) => {
  
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
      { loading
        ? <ActivityIndicator size='small' color={ colors.accent } />
        : <TouchableOpacity
            activeOpacity={ 0.6 }
            onPress={ startSelect }
          >
            <Text style={ valueStyle }>{ value }</Text>
          </TouchableOpacity>
      }
    </View>
  )
}

const InfoInput = ({ placeholder, item, onInfoChanged }) => {
  return (
    <View style={ styles.infoItem }>
      <Text style={ styles.itemName }>{ item.name }</Text>
      <TextInput
        placeholderTextColor={ colors.textSecondary }
        placeholder={ placeholder }
        style={ styles.inputText }
        value={ item.value }
        onChangeText={ onInfoChanged }
      />
    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '6%'
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
    height: 36
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: text.size.label
  },
  itemValue: {
    fontSize: text.size.label
  },
  placeholder: {
    fontSize: text.size.label,
    color: colors.textSecondary
  },
  inputText: {
    color: colors.accent,
    fontFamily: 'Aero Matics Light',
    fontSize: text.size.label,
    textAlign: 'right',
    padding: 0 // overrides TextInput´s default padding to prevent text cut-off
  },
  deleteButton: {
    width: 220,
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30
  }
})
