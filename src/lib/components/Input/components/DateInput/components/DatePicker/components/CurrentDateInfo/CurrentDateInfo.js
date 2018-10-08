import React, { Component } from 'react';
import './CurrentDateInfo.css';

class CurrentDateInfo extends Component {
  constructor(props) {
    super(props);
    const dateProp = props.date || new Date();

    const monthsList = [
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

    const date = dateProp.getDate();
    const month = dateProp.getMonth();
    const monthName = monthsList[month];
    const year = dateProp.getFullYear();

    this.state = {
      date,
      year,
      monthName,
    };
  }

  render() {
    return (
      <div className="CurrentDateInfo">
        <div className="CurrentDateInfo__date">
          <div className="CurrentDateInfo__date__part">{ this.state.date }</div>/
          <div className="CurrentDateInfo__date__part">{ this.state.monthName }</div>/
          <div className="CurrentDateInfo__date__part">{ this.state.year }</div>
        </div>
        <div className="CurrentDateInfo__day">Monday</div>
      </div>
    );
  }

}

export default CurrentDateInfo;
