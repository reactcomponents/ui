import React, { Component } from 'react';
import './Input.css';
import {
  TextInput,
  Select,
  CheckBox,
  Radio,
  Range,
} from '../..';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type || 'text',
      name: props.name,
      label: props.label || '',
      placeholder: props.placeholder || '',
      options: props.options || [],
      value: props.value || '',
      onChange: props.onChange || (() => { }),
      onChangeWatch: props.onChangeWatch || (() => { }),
      __onChange: props.__onChange || (() => { }),
      __onInit: props.__onInit || (() => { }),
    };
  }

  componentWillMount() {
    this.state.__onInit(this.state.name, this.state.value);
  }

  handleInput = (name, value) => {
    this.setState({ value });
    this.state.onChange(name, value);
    this.state.__onChange(name, value);
  }

  render() {
    const allowedTypes = [
      'text',
      'email',
      'tel',
      'number',
      'password',
      'date',
      'search',

      'select',
      'checkbox',
      'radio',
      'range',
      'slider',
    ];

    if (!allowedTypes.includes(this.state.type)) {
      return null;
    }

    switch (this.state.type) {
      case 'select':
        return (
          <Select
            name={this.state.name}
            label={this.state.label}
            placeholder={this.state.placeholder}
            options={this.state.options}
            onChange={this.handleInput}
          />
        );

      case 'checkbox':
        return (
          <CheckBox
            name={this.state.name}
            label={this.state.label}
            options={this.state.options}
            onChange={this.handleInput}
          />
        );

      case 'radio':
        return (
          <Radio
            name={this.state.name}
            label={this.state.label}
            options={this.state.options}
            onChange={this.handleInput}
          />
        );

      case 'range':
        return (
          <Range
            type="range"
            name={this.state.name}
            onChange={this.handleInput}
            onChangeWatch={this.state.onChangeWatch}
          />
        );

      case 'slider':
        return (
          <Range
            type="slider"
            name={this.state.name}
            onChange={this.handleInput}
            onChangeWatch={this.state.onChangeWatch}
          />
        );

      default:
        return (
          <TextInput
            type={this.state.type}
            name={this.state.name}
            label={this.state.label}
            placeholder={this.state.placeholder}
            value={this.state.value}
            onChange={this.handleInput}
          />
        );
    }
  }

}

export default Input;
