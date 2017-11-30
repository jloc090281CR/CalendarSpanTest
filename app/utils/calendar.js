import request from 'superagent'
import moment from 'moment'

import { DAYSOFWEEK, MONTHOFYEAR } from 'constants/calendar'

export function generateCalendars (startDate, numberOfDays, countryCode) {
  return new Promise((resolve, reject) => {
    const newDate = moment(startDate).utc().format('MM-DD-YYYY')
    const days = Number(numberOfDays)
    const year = moment(startDate).utc().year()
    if (!newDate || isNaN(days) || countryCode === '') {
      return reject(new Error('The provided parameters are invalid. Please try again.'))
    }
    const HOLIDAYS_CALENDAR_URL = 'https://holidayapi.com/v1/holidays'
    const API_KEY = 'c46d4a8c-a27a-4a41-b9a2-9f5bcc45c459'
    try {
      request.get(HOLIDAYS_CALENDAR_URL + '?key=' + API_KEY + '&country=' + countryCode + '&year=' + year)
        .end((err, res) => {
          if (err) {
            return reject(new Error('There was an error trying to get the holydays from API.'))
          } else {
            const data = JSON.parse(res.text)
            const calendars = buildCalendarInfo(newDate, days, data.holidays)
            return resolve(calendars)
          }
        })
    } catch (ex) {
      return reject(new Error('There was an error trying to generate the calendar information.'))
    }
  })
}

export function buildCalendarInfo (startDate, numberOfDays, holidays) {
  let addedNumber = 0
  let currentDay = startDate
  let currentMonth = moment(currentDay).utc().format('M')
  const calendars = []
  const weeks = []
  while (addedNumber <= numberOfDays) {
    const daysOfWeek = []
    let currentDayMonth = moment(currentDay).utc().format('M')
    DAYSOFWEEK.forEach((day) => {
      let cellStyle = ''
      let label = ''
      const isoWeekDay = moment(currentDay).utc().isoWeekday()
      if (isoWeekDay !== day.isoWeekday || currentMonth !== currentDayMonth || addedNumber > numberOfDays) {
        cellStyle = 'invalidDay'
      } else {
        if (findHolidayFromObject(currentDay, holidays)) {
          cellStyle = 'holiday'
        } else {
          if ([6, 7].includes(isoWeekDay)) {
            cellStyle = 'weekendDay'
          } else {
            cellStyle = 'weekDay'
          }
        }
        label = moment(currentDay).utc().format('D')
      }
      const dayToAdd = [cellStyle, label]
      daysOfWeek.push(dayToAdd)
      if (cellStyle !== 'invalidDay') {
        currentDay = moment(currentDay).utc().add(1, 'days')
        currentDayMonth = moment(currentDay).utc().format('M')
        addedNumber = addedNumber + 1
      }
    })
    weeks.push(daysOfWeek)
    if (currentMonth !== currentDayMonth || addedNumber > numberOfDays) {
      const calendar = {
        monthLabel: MONTHOFYEAR.find((month) => { return month.monthNumber === currentMonth }).label,
        weeks: [].concat(weeks)
      }
      weeks.length = 0
      calendars.push(calendar)
      if (currentMonth !== currentDayMonth) currentMonth = currentDayMonth
    }
  }
  return calendars
}

export function findHolidayFromObject (dayToFind, holidays) {
  let found = false
  const formattedDay = moment(dayToFind).utc().format('YYYY-MM-DD')
  const holidaysObjects = Object.keys(holidays)
  for (var i = 0; i < holidaysObjects.length; ++i) {
    if (holidaysObjects[i] === formattedDay) {
      found = true
      break
    }
  }
  return found
}
