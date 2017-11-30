import { generateCalendars } from 'utils/calendar'

export const SET_START_DATE = 'calendar/SET_START_DATE'
export function setStartDate (value, error) {
  return {
    type: SET_START_DATE,
    payload: { value, error }
  }
}

export const SET_NUMBER_OF_DAYS = 'calendar/SET_NUMBER_OF_DAYS'
export function setNumberOfDays (value, error) {
  return {
    type: SET_NUMBER_OF_DAYS,
    payload: { value, error }
  }
}

export const SET_COUNTRY_CODE = 'calendar/SET_COUNTRY_CODE'
export function setCountryCode (value) {
  return {
    type: SET_COUNTRY_CODE,
    payload: { value }
  }
}

export const SET_CALENDAR = 'calendar/SET_CALENDAR'
export function setCalendar (value) {
  return {
    type: SET_CALENDAR,
    payload: { value }
  }
}

export function getCalendarInformation () {
  return (dispatch, getState) => {
    const { startDate, numberOfDays, countryCode } = getState().calendar
    return generateCalendars(startDate, numberOfDays, countryCode)
      .then((results) => {
        dispatch(setCalendar(results))
      })
  }
}
