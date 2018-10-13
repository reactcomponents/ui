import React, { Component } from 'react';
import './CurrentDateInfo.css';

class CurrentDateInfo extends Component {
  constructor(props) {
    super(props);
    this.monthsList = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.daysList = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  }

  render() {
    const {
      date,
      month,
      year,
      day,
    } = this.props;

    return (
      <div className="CurrentDateInfo">
        <div className="CurrentDateInfo__date">
          <div className="CurrentDateInfo__date__part">{ date }</div>/
          <div className="CurrentDateInfo__date__part">{ this.monthsList[month] }</div>/
          <div className="CurrentDateInfo__date__part">{ year }</div>
        </div>
        <div className="CurrentDateInfo__day">{ this.daysList[day] }</div>
      </div>
    );
  }

}

export default CurrentDateInfo;
