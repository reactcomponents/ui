import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import './DatePicker.css';
import CurrentDateInfo from './components/CurrentDateInfo/CurrentDateInfo';
import ListPicker from '../../../../../ListPicker/ListPicker';
import Button from '../../../../../Button/Button';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.list = {
      daysOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
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
      ],
      dates: this.generateList(1, 31),
      years: this.generateList(1950, 2050),
    };

    this.state = {
      date: props.value.getDate(),
      month: props.value.getMonth(),
      year: props.value.getFullYear(),
      day: props.value.getDay(),
    };
  }

  generateList = (start, end) => {
    const list = [];

    for (let i = start; i <= end; i++) {
      list.push(i);
    }

    return list;
  }

  handleInput = (name, input, index) => {
    const value = (name === 'month') ? index : input;

    const dateValues = {
      ...this.state,
      [name]: value,
    };

    const {
      date,
      month,
      year,
    } = dateValues;

    const thisDate = new Date(year, month, date);
    dateValues.day = thisDate.getDay();
    dateValues.dayName = this.list.daysOfWeek[dateValues.day];
    dateValues.monthName = this.list.months[month];

    this.setState(dateValues);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onChange(this.state);
  }

  render() {
    const {
      date,
      month,
      year,
      day,
    } = this.state;

    const monthName = this.list.months[month];

    const buttonStyles = {
      color: '14px',
      padding: '10px 15px',
    };

    return (
      <div className="DatePicker">
        <CurrentDateInfo
          date={date}
          month={monthName}
          year={year}
          day={day}
        />

        <div className="DatePicker__list">
          <ListPicker
            label="Day"
            list={this.list.dates}
            defaultValue={date}
            onChange={(input, index) => this.handleInput('date', input, index)}
          />
          <div className="DatePicker__picker__column-divider" />
          <ListPicker
            label="Month"
            list={this.list.months}
            defaultValue={monthName}
            onChange={(input, index) => this.handleInput('month', input, index)}
          />
          <div className="DatePicker__picker__column-divider" />
          <ListPicker
            label="Year"
            list={this.list.years}
            defaultValue={year}
            onChange={(input, index) => this.handleInput('year', input, index)}
          />
        </div>

        <div className="DatePicker__buttons">
          <Button style={buttonStyles} onClick={this.props.onCancel}>Cancel</Button>
          <Button style={buttonStyles} onClick={this.handleSubmit}>Set</Button>
        </div>
      </div>
    );
  }

}

DatePicker.propTypes = {
  value: PropsTypes.instanceOf(Date),
  onChange: PropsTypes.func,
  onCancel: PropsTypes.func,
};

DatePicker.defaultProps = {
  value: new Date(),
  onChange: () => {},
  onCancel: () => {},
};

export default DatePicker;
