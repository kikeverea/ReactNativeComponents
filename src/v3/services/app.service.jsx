import axios from "axios";

import { get } from '../helpers/axios.helper'
//Detecta si la app esta en los 30min de evento de Hora 0
export const checkZeroHour = async authFailed => {
  return await get('/check_zero_hour.json', { authFailed })
}

//Recoge las slides cuando estamos en Hora 0
export const getSlides = async authFailed => {
  return await get('/get_slides.json', { authFailed })
}