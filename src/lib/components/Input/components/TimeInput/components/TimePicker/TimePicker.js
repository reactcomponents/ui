import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import './TimePicker.css';
import CurrentTimeInfo from './components/CurrentTimeInfo/CurrentTimeInfo';
import ListPicker from '../../../../../ListPicker/ListPicker';
import Button from '../../../../../Button/Button';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.list = {
      hours: this.generateList(1, 12),
      minutes: this.generateList(0, 59),
      seconds: this.generateList(0, 59),
      ampm: [
        'AM',
        'PM',
      ],
    };

    const hour = this.zeroPadding(props.value.getHours());
    const minute = this.zeroPadding(props.value.getMinutes());
    const ampm = hour < 12 ? 'AM' : 'PM';

    this.state = {
      hour,
      minute,
      second: '00',
      ampm,
    };
  }

  generateList = (start, end) => {
    const list = [];

    for (let i = start; i <= end; i++) {
      list.push(this.zeroPadding(i));
    }

    return list;
  }

  zeroPadding = (input) => {
    const value = input.toString();
    return value.length < 2 ? `0${value}` : value;
  }

  handleInput = (name, input) => {
    this.setState({
      [name]: input,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onChange(this.state);
  }

  render() {
    const {
      hour,
      minute,
      second,
      ampm,
    } = this.state;

    const buttonStyles = {
      color: '14px',
      padding: '10px 15px',
    };

    return (
      <div className="TimePicker">
        <CurrentTimeInfo
          hour={hour}
          minute={minute}
          second={second}
          ampm={ampm}
        />

        <div className="TimePicker__list">
          <ListPicker
            label="hh"
            list={this.list.hours}
            defaultValue={hour}
            onChange={(input, index) => this.handleInput('hour', input, index)}
          />
          <div className="TimePicker__picker__column-divider" />
          <ListPicker
            label="mm"
            list={this.list.minutes}
            defaultValue={minute}
            onChange={(input, index) => this.handleInput('minute', input, index)}
          />
          <div className="TimePicker__picker__column-divider" />
          <ListPicker
            label="ss"
            list={this.list.seconds}
            defaultValue={second}
            onChange={(input, index) => this.handleInput('second', input, index)}
          />
          <div className="TimePicker__picker__column-divider" />
          <ListPicker
            list={this.list.ampm}
            defaultValue={ampm}
            onChange={(input, index) => this.handleInput('ampm', input, index)}
          />
        </div>

        <div className="TimePicker__buttons">
          <Button style={buttonStyles} onClick={this.props.onCancel}>Cancel</Button>
          <Button style={buttonStyles} onClick={this.handleSubmit} color="white" backgroundColor="blue">Set</Button>
        </div>
      </div>
    );
  }

}

TimePicker.propTypes = {
  value: PropsTypes.instanceOf(Date),
  onChange: PropsTypes.func,
  onCancel: PropsTypes.func,
};

TimePicker.defaultProps = {
  value: new Date(),
  onChange: () => {},
  onCancel: () => {},
};

export default TimePicker;
