import React, { Component } from 'react';
import './Input.css';
import TextInput from './components/TextInput/TextInput';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type || 'text',
      label: props.label || '',
      placeholder: props.placeholder || '',
      onChange: props.onChange || (() => { }),
      value: props.value || '',
    };
  }

  handleInput = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ value });
    this.state.onChange(value);
  }

  render() {
    const allowedTypes = ['text', ' email', 'tel', 'number', 'password', 'date', 'search'];

    if (!allowedTypes.includes(this.state.type)) {
      return null;
    }

    switch (this.state.type) {
      default:
        return (
          <TextInput
            type={this.state.type}
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
