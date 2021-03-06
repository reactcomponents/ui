import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substr(2, 9),
      name: props.name,
      type: props.type,
      label: props.label,
      placeholder: props.placeholder,
      value: props.value,
      onChange: props.onChange,
      __onChange: props.__onChange || (() => { }),
      __onInit: props.__onInit || (() => { }),
      refs: {
        input: React.createRef(),
      },
      status: {
        isFocused: false,
        isFilled: false,
      },
    };
  }

  componentWillMount() {
    this.state.__onInit(this.state.name, this.state.value);
  }

  handleInput = (event) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({ value });

    this.state.onChange(this.state.name, value);
    this.state.__onChange(this.state.name, value);
  }

  handleFocus = () => {
    if (!this.state.status.isFocused) {
      this.setState({
        status: {
          ...this.state.status,
          isFocused: true,
        },
      });
    }
    this.state.refs.input.current.focus();
  }

  handleBlur = () => {
    if (this.state.status.isFocused) {
      this.setState({
        status: {
          ...this.state.status,
          isFocused: false,
        },
      });
    }
  }

  render() {
    return (
      <div
        className="TextInput"
        data-isfocused={this.state.status.isFocused}
        data-isfilled={this.state.status.isFilled}
        onClick={this.handleFocus}
      >
        <label htmlFor={this.state.id}>
          <div className="TextInput__label">{ this.state.label }</div>
          <div className="TextInput__input">
            <input
              type={this.state.type}
              id={this.state.id}
              ref={this.state.refs.input}
              placeholder={this.state.placeholder}
              value={this.state.value}
              onChange={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </div>
        </label>
      </div>
    );
  }

}

export default TextInput;
