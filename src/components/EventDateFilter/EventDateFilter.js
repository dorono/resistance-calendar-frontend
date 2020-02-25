import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import {FaCalendar} from 'react-icons/fa';

import styles from './EventDateFilter.sass';

// Normally I'd break this out to its own component file but since it's only being used by the Datepicker, it seems unnecessary
// Note that b/c this component uses refs, it cannot be a stateless functional component
// See: https://hacker0x01.github.io/react-datepicker/#example-29
class CustomDatepickerInput extends Component {  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <button
        className={`react-datepicker-ignore-onclickoutside ${styles.dateFilterBtn}`}
        onClick={this.props.onClick}
      >
        <FaCalendar />
        <span>{this.props.value}</span>
      </button>
    );
  }
}

CustomDatepickerInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

const EventDateFilter = (props) => {
  const { startDate, updateFilters, placeholderText, isClearable } = props;
  const selected = moment(startDate).toDate();
  return (
    <div className={styles.dateFilter}>
      <DatePicker
        dateFormat="ddd MMM d"
        selected={selected}
        customInput={<CustomDatepickerInput />}
        onChange={date => updateFilters({ startDate: date })}
        isClearable={isClearable}
        popoverAttachment="top center"
        popoverTargetAttachment="bottom left"
        withPortal={window.innerWidth < 768}
        placeholderText={placeholderText}
        readOnly
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
