import * as actions from './actions'

const defaultState = {
  startDate: '',
  startDateErrorText: '',
  numberOfDays: 0,
  numberOfDaysErrorText: '',
  countryCode: 'US',
  calendar: []
}

export default function calendar (state = defaultState, { type, payload }) {
  switch (type) {
    case actions.SET_START_DATE:
      return { ...state, startDate: payload.value, startDateErrorText: payload.error }

    case actions.SET_NUMBER_OF_DAYS:
      return { ...state, numberOfDays: payload.value, numberOfDaysErrorText: payload.error }

    case actions.SET_COUNTRY_CODE:
      return { ...state, countryCode: payload.value }

    case actions.SET_CALENDAR:
      return { ...state, calendar: payload.value }

    default:
      return state
  }
}
