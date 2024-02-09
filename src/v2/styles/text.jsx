import colors from './colors'

const size = {
  title: 28,
  button: 20,
  header: 18,
  label: 16,
  secondary: 12,
  tiny: 10,
}

const title = {
  color: colors.textPrimary,
  fontWeight: 'bold',
  fontSize: size.title
}

const header = {
  color: colors.textPrimary,
  fontSize: size.header
}

export default { title, header, size }

