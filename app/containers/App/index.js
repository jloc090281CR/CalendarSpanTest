import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setStartDate,
  setNumberOfDays,
  setCountryCode,
  getCalendarInformation
} from 'store/calendar/actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Calendar from 'components/Calendar'

import { DAYSOFWEEK } from 'constants/calendar'

import moment from 'moment'
import styles from './styles.css'

export class App extends Component {
  constructor (props) {
    super(props)

    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleNumberOfDaysChange = this.handleNumberOfDaysChange.bind(this)
    this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleStartDateChange (evt, value) {
    const newDate = moment(value).utc().format('MM-DD-YYYY')
    let startDateErrorText = ''
    if (newDate === 'Invalid date') {
      startDateErrorText = 'Invalid date'
    } else {
      startDateErrorText = ''
    }
    this.props.setStartDate(value, startDateErrorText)
  }

  handleNumberOfDaysChange (evt, value) {
    let numberOfDaysErrorText = ''
    let numberOfDays = Number(value)
    if (isNaN(numberOfDays)) {
      numberOfDaysErrorText = 'Invalid value provided'
      numberOfDays = 0
    }
    this.props.setNumberOfDays(numberOfDays, numberOfDaysErrorText)
  }

  handleCountryCodeChange (evt, value) {
    this.props.setCountryCode(value)
  }

  handleButtonClick () {
    const { startDate, numberOfDays, countryCode, getCalendarInformation } = this.props
    if (startDate && numberOfDays && countryCode !== '') {
      getCalendarInformation()
    }
  }

  render () {
    const { calendar } = this.props
    if (calendar.length) {
      console.log(calendar)
    }
    let devToolsContainer
    if (process.env.NODE_ENV === 'development') {
      const DevTools = require('components/DevTools').default
      devToolsContainer = <DevTools />
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          { devToolsContainer }
          <div id='id_app_content' className={styles.app}>
            <TextField
              hintText='Start Date:'
              errorText={this.props.startDateErrorText}
              value={this.props.startDate}
              onChange={this.handleStartDateChange} />
            <br />
            <TextField
              hintText='Number of days:'
              errorText={this.props.numberOfDaysErrorText}
              value={this.props.numberOfDays}
              onChange={this.handleNumberOfDaysChange} />
            <br />
            <TextField
              hintText='Country Code:'
              value={this.props.countryCode}
              onChange={this.handleCountryCodeChange} />
            <br />
            <RaisedButton label='Proceed' onClick={this.handleButtonClick} />
          </div>
          <div className={styles.calendarDiv}>
            {calendar.map((item, index) =>
              <Calendar key={index} monthName={item.monthLabel} daysHeader={DAYSOFWEEK} weeks={item.weeks} />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  startDate: PropTypes.string,
  startDateErrorText: PropTypes.string,
  numberOfDays: PropTypes.number,
  numberOfDaysErrorText: PropTypes.string,
  countryCode: PropTypes.string,
  calendar: PropTypes.array,
  setStartDate: PropTypes.func,
  setNumberOfDays: PropTypes.func,
  setCountryCode: PropTypes.func,
  getCalendarInformation: PropTypes.func
}

const mapStateToProps = (state) => ({
  startDate: state.calendar.startDate,
  startDateErrorText: state.calendar.startDateErrorText,
  numberOfDays: state.calendar.numberOfDays,
  numberOfDaysErrorText: state.calendar.numberOfDaysErrorText,
  countryCode: state.calendar.countryCode,
  calendar: state.calendar.calendar
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setStartDate,
    setNumberOfDays,
    setCountryCode,
    getCalendarInformation
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
