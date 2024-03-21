export const resolveFontFamily = (os, style, weight) => {
    return os === 'android'
        ? resolveAndroid(style, weight)
        : resolveIOS(style, weight)
}

const resolveIOS = (style, weight) => {
    
    if (style === 'italic')
        return weight === 'regular'
            ? 'AeroMaticsItalic'
            : 'AeroMaticsLightItalic'

    switch (weight) {
        case 'bold' :
            return 'AeroMaticsBold'
        case 'regular' :
            return 'AeroMaticsRegular'
        default:
            return 'AeroMaticsLightRegular'
    }
}

const resolveAndroid = (style, weight) => {
    if (style === 'italic')
        return weight === 'regular'
            ? 'Aero Matics Italic'
            : 'Aero Matics Light Italic'
  
    switch (weight) {
        case ('bold') :
            return 'Aero Matics Bold'

        case ('regular') :
            return 'Aero Matics Regular'
            
        default :
            return 'Aero Matics Light'
    }
}