import React, { Component } from 'react';
import './DatePicker.css';
import CurrentDateInfo from './components/CurrentDateInfo/CurrentDateInfo';
import ListPicker from '../../../../../ListPicker/ListPicker';

class DatePicker extends Component {
  constructor(props) {
    super();

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

    const daysList = Array.from(Array(31)).map((item, index) => {
      return index + 1;
    });

    const yearsList = Array.from(Array(100)).map((item, index) => {
      return index + 1951;
    });

    this.state = {
      daysList,
      monthsList,
      yearsList,
      values: {
        date: 5,
        month: 5,
        year: 1970,
        day: 0,
      },
    };
  }

  handleInput = (name, input, index) => {
    const value = (name === 'month') ? index : input;

    const dateValues = {
      ...this.state.values,
      [name]: value,
    };

    const {
      date,
      month,
      year,
    } = dateValues;

    const thisDate = new Date(date, month, year);
    dateValues.day = thisDate.getDay();

    this.setState({
      values: {
        ...this.state.values,
        ...dateValues,
      },
    });
  }

  render() {
    return (
      <div className="DatePicker">
        <CurrentDateInfo
          date={this.state.values.date}
          month={this.state.values.month}
          year={this.state.values.year}
          day={this.state.values.day}
        />

        <div className="DatePicker__list">
          <ListPicker
            label="Day"
            list={this.state.daysList}
            defaultValue={this.state.values.date}
            onChange={(input, index) => this.handleInput('date', input, index)}
          />
          <div className="DatePicker__picker__column-divider" />
          <ListPicker
            label="Month"
            list={this.state.monthsList}
            defaultValue={this.state.monthsList[this.state.values.month]}
            onChange={(input, index) => this.handleInput('month', input, index)}
          />
          <div className="DatePicker__picker__column-divider" />
          <ListPicker
            label="Year"
            list={this.state.yearsList}
            defaultValue={this.state.values.year}
            onChange={(input, index) => this.handleInput('year', input, index)}
          />
        </div>

        <div className="DatePicker__buttons">
          {/* Create Action Button */}
        </div>
      </div>
    );
  }

}

export default DatePicker;
