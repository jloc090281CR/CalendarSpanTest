import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import calendar from './calendar/reducer'

export default combineReducers({
  routing,
  calendar
})
