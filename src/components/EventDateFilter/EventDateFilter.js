import React, { PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import styles from './EventDateFilter.sass';

console.log('styles', styles);

const dateFormatToday = 'MMM D';
const dateFormatMain = 'ddd MMM D';

function isStartDateToday(startDate) {
  const dateToday = moment();
  return moment(startDate).isSame(dateToday, 'day');
}

function generateDateFormat(startDate){

  if (isStartDateToday(startDate)) {
    return dateFormatToday;
  }

  return dateFormatMain;
}

const EventDateFilter = (props) => {
  const { startDate, updateFilters, placeholderText, isClearable } = props;

  return (
    <div className={styles.dateFilterText}>
      <span className={styles.todayText}>{isStartDateToday(startDate) && 'TODAY'}</span>
      <DatePicker
        dateFormat={generateDateFormat(startDate)}
        selected={startDate}
        onChange={date => updateFilters({ startDate: date })}
        isClearable={isClearable}
        placeholderText={placeholderText}
      />
    </div>
  );
};

EventDateFilter.defaultProps = {
  placeholderText: `TODAY ${moment().format('MMM D')}`,
  isClearable: false
};

EventDateFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  startDate: PropTypes.shape(),  // momentjs object (or null)
  placeholderText: PropTypes.string,
  isClearable: PropTypes.bool
};

export default EventDateFilter;
