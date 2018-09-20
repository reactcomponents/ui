import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substr(2, 9),
      type: props.type,
      label: props.label,
      placeholder: props.placeholder,
      onChange: props.onChange,
      value: props.value,
      refs: {
        input: React.createRef(),
      },
      status: {
        isFocused: false,
        isFilled: false,
      },
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value,
    });
  }

  handleFocus = () => {
    this.setState({
      status: {
        ...this.state.status,
        isFocused: true,
      },
    });
    this.state.refs.input.current.focus();
  }

  handleBlur = () => {
    this.setState({
      status: {
        ...this.state.status,
        isFocused: false,
      },
    });
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
              onChange={this.state.onChange}
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
