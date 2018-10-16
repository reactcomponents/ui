import React from 'react';
import PropTypes from 'prop-types';
import './CurrentDateInfo.css';

const CurrentDateInfo = (props) => {
  const {
    date,
    month,
    year,
    day,
  } = props;

  if ((date && month && year && day) === null) {
    /**
     * If any of the required prop is missing,
     * then return null
     */
    return null;
  }

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div className="CurrentDateInfo">
      <div className="CurrentDateInfo__date">
        <div className="CurrentDateInfo__date__part">{ date }</div>/
        <div className="CurrentDateInfo__date__part">{ month }</div>/
        <div className="CurrentDateInfo__date__part">{ year }</div>
      </div>
      <div className="CurrentDateInfo__day">{ daysOfWeek[day] }</div>
    </div>
  );
};

CurrentDateInfo.propTypes = {
  date: PropTypes.number,
  month: PropTypes.string,
  year: PropTypes.number,
  day: PropTypes.number,
};

CurrentDateInfo.defaultProps = {
  date: null,
  month: null,
  year: null,
  day: null,
};

export default CurrentDateInfo;
