import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import './DateInput.css';
import Modal from '../../../Modal/Modal';
import DatePicker from './components/DatePicker/DatePicker';

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.id = uuidv4();
    this.state = {
      value: props.value,
      status: {
        isFocused: false,
        isDatePickerVisible: false,
      },
    };

    props.__onInit(props.name, props.value);
  }

  handleFocus = () => {
    this.setState({
      status: {
        ...this.state.status,
        isFocused: true,
      },
    });
  }

  handleBlur = () => {
    this.setState({
      status: {
        ...this.state.status,
        isFocused: false,
      },
    });
  }

  handleInput = (input) => {
    const {
      date,
      month,
      year,
    } = input;

    const displayValue = new Date(year, month, date).toDateString();

    this.setState({
      value: displayValue,
      status: {
        ...this.state.status,
        isDatePickerVisible: false,
      },
    });

    this.props.onChange(this.props.name, input);
    this.props.__onChange(this.props.name, input);
  }

  showDatePicker = () => {
    this.setState({
      status: {
        ...this.state.status,
        isDatePickerVisible: true,
      },
    });
  }

  hideDatePicker = () => {
    this.setState({
      status: {
        ...this.state.status,
        isDatePickerVisible: false,
      },
    });
  }

  render() {
    const {
      label,
      placeholder,
    } = this.props;

    const {
      value,
      status,
    } = this.state;

    return (
      <div
        className="DateInput"
        data-isfocused={status.isFocused}
        data-isselected={value !== ''}
      >
        <div className="DateInput__overlay">
          <div className="DateInput__overlay__color DateInput__overlay__color--dark" />
          <div className="DateInput__overlay__color DateInput__overlay__color--white" />
        </div>

        <label
          htmlFor={this.id}
          className="DateInput__label"
          onMouseDown={this.showDatePicker}
        >
          { label }
        </label>

        <div
          className="DateInput__input"
          data-isfocused={status.isFocused}
          onMouseDown={this.showDatePicker}
        >
          <div className="DateInput__input__icon">
            <div className="icon" />
          </div>
          <div className="DateInput__input__value">
            { value || placeholder }
          </div>
        </div>

        <div className="DateInput__selector">
          <Modal
            isVisible={status.isDatePickerVisible}
            onHide={this.hideDatePicker}
          >
            <DatePicker
              value={!value ? new Date() : new Date(value)}
              onChange={this.handleInput}
              onCancel={this.hideDatePicker}
            />
          </Modal>
        </div>
      </div>
    );
  }

}

DateInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  // value: PropTypes.any,
  onChange: PropTypes.func,
  __onChange: PropTypes.func,
  __onInit: PropTypes.func,
};

DateInput.defaultProps = {
  name: '',
  label: '',
  placeholder: '',
  // value: '',
  onChange: () => {},
  __onChange: () => {},
  __onInit: () => {},
};

export default DateInput;
