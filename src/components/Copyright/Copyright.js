import React from 'react';
import PropTypes from 'prop-types';

import styles from './Copyright.sass';

const Copyright = (props) => {
  return (
    <p className={styles.wrapper}>
      <span>&copy; </span>
      <span>{props.year}&nbsp;</span>
      <span>The Resistance Calendar</span>
    </p>
  );
};

Copyright.propTypes = {
  year: PropTypes.number.isRequired
};

export default Copyright;
