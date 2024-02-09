export const MIN_INTERESTS = 5
export const MAX_INTERESTS = 15

export const mandatoryFields = [
  'email',
  'name',
  'town_id',
  'country_id',
  'nif',
  'gender',
  'nick'
]

export const validateUserProfile = userProfile => {
  const { user, interests } = userProfile
  const missingFields = []
  
  const profileFields =
    Object
      .keys(user)
      .filter(field => mandatoryFields.includes(field))

  for (field of mandatoryFields) {

    if (profileFields.includes(field) && notEmpty(user[field]))
      continue

    missingFields.push(field)
  }

  if (interests === null || interests.length < MIN_INTERESTS)
    missingFields.push('interests')

  return missingFields
}

const notEmpty = value => 
  value !== null &&
  (
    typeof value === 'string' && value.trim().length > 0 ||
    value > 0
  )