import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import './DateInput.css';
import Modal from '../../../Modal/components/Modal/Modal';
import DatePicker from './components/DatePicker/DatePicker';

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
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
    this.setState({
      value: input,
    });
    this.props.onChange(input);
    this.props.__onChange(input);
  }

  showDatePicker = () => {
    this.setState({
      status: {
        ...this.state.status,
        isDatePickerVisible: true,
      },
    });
  }

  render() {
    const {
      label,
      placeholder,
    } = this.props;

    const {
      id,
      value,
      status,
    } = this.state;

    return (
      <div className="DateInput" data-isfocused={status.isFocused} data-isselected={value !== ''}>
        <div className="DateInput__overlay">
          <div className="DateInput__overlay__color DateInput__overlay__color--dark" />
          <div className="DateInput__overlay__color DateInput__overlay__color--white" />
        </div>

        <label htmlFor={id} className="DateInput__label" onMouseDown={this.showDatePicker}>{ label }</label>

        <div className="DateInput__input" data-isfocused={status.isFocused} onMouseDown={this.showDatePicker}>
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
            content={
              <DatePicker onChange={this.handleInput} />
            }
          />
        </div>
      </div>
    );
  }

}

DateInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  __onChange: PropTypes.func,
  __onInit: PropTypes.func,
};

DateInput.defaultProps = {
  name: '',
  label: '',
  placeholder: '',
  value: '',
  onChange: () => {},
  __onChange: () => {},
  __onInit: () => {},
};

export default DateInput;
