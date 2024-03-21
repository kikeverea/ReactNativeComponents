import { nickIsAvailable, validateFriendlyCode } from '../services/auth.service'

export const validateEmail = async email => {
  return validateMandatory(email)
}

export const validateName = name => {
  return validateMandatory(name)
}

export const validatePassword = password => {
  if (!password)
    return { valid: false, error: mandatoryField }

  return { valid: true }
}

export const validateNick = async nick => {
  if (!nick)
    return { valid: false, error: mandatoryField }

  const availble = await nickIsAvailable('test')

  if (!availble)
    return { valid: false, error: 'El nick ya existe'}

  return { valid: true }
}

export const validateCode = async code => {
  const valid = await validateFriendlyCode(code)

  if (!valid)
    return { valid: false, error: 'El código no es válido'}

  return { valid: true }
}

const validateMandatory = field => {
  return field ? { valid: true } : { valid: false, error: mandatoryField }
}

const mandatoryField = 'Campo obligatorio'
