import Toast from "react-native-toast-message"

export const toastSuccess = (msg, duration=4000) => {
    toast(msg, 'success', duration)
}

export const toastWarning = (msg, duration=4000) => {
    toast(msg, 'warning', duration)
}

export const toastError = (msg, duration=4000) => {
    toast(msg, 'error', duration)
}

const toast = (msg, type, duration) => {
    Toast.show({
        type: type,
        text1: msg,
        position: 'bottom',
        visibilityTime: duration
    })
}