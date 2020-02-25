import React from 'react';
import PropTypes from 'prop-types';

import styles from './AddEventButton.sass';

const AddEventButton = (props) => {
  return (
    <button className={styles.btnAddEvents} onClick={props.handleButtonClick} >Add Event</button>
  );
};

AddEventButton.propTypes = {
  handleButtonClick: PropTypes.func.isRequired
};

export default AddEventButton;
