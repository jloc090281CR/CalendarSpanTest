import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Calendar = (props) => {
  const { monthName, daysHeader, weeks } = props
  const daysOfWeekLabel = daysHeader.map((item) => { return item.label })
  return (
    <div className={styles.calendarContainer}>
      <p className={styles.monthName}>{monthName}</p>
      <table>
        <thead>
          <tr id={'calendarHeaderRow'} className={styles.headerRow}>
            {daysOfWeekLabel.map((dayHeaderLabel, index) =>
              <th key={index} className={styles.headerCell}>{dayHeaderLabel}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) =>
            <tr key={i} id={`body_row_id_${i}`} className={styles.bodyRow} >
              {week.map((dayOfMonth, j) =>
                <td key={j} className={`${styles.bodyCell} ${dayOfMonth[0] === 'invalidDay' ? styles.invalidDay : dayOfMonth[0] === 'holiday' ? styles.holiday : dayOfMonth[0] === 'weekDay' ? styles.weekDay : styles.weekendDay}`}>{dayOfMonth[1]}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

Calendar.propTypes = {
  monthName: PropTypes.string,
  daysHeader: PropTypes.array,
  weeks: PropTypes.array
}

export default Calendar
