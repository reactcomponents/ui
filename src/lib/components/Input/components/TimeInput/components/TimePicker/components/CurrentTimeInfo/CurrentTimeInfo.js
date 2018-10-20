import React from 'react';
import PropTypes from 'prop-types';
import './CurrentTimeInfo.css';

const CurrentTimeInfo = (props) => {
  const {
    hour,
    minute,
    second,
    ampm,
  } = props;

  if ((hour && minute && second && ampm) === null) {
    /**
     * If any of the required prop is missing,
     * then return null
     */
    return null;
  }

  return (
    <div className="CurrentTimeInfo">
      <div className="CurrentTimeInfo__time">
        <div className="CurrentTimeInfo__time__part">{ hour }</div>
        <span className="CurrentTimeInfo__time__colon">:</span>
        <div className="CurrentTimeInfo__time__part">{ minute }</div>
        <span className="CurrentTimeInfo__time__colon">:</span>
        <div className="CurrentTimeInfo__time__part">{ second }</div>
        <div className="CurrentTimeInfo__time__part CurrentTimeInfo__time__part--ampm">{ ampm }</div>
      </div>
    </div>
  );
};

CurrentTimeInfo.propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  second: PropTypes.string,
  ampm: PropTypes.string,
};

CurrentTimeInfo.defaultProps = {
  hour: null,
  minute: null,
  second: '00',
  ampm: 'AM',
};

export default CurrentTimeInfo;
