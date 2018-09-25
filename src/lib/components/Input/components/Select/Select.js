import React, { Component } from 'react';
import './Select.css';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substr(2, 9),
      name: props.name,
      label: props.label || '',
      placeholder: props.placeholder,
      onChange: props.onChange,
      options: props.options || [],
      value: '',
      refs: {
        select: React.createRef(),
      },
      status: {
        isFocused: false,
      },
    };
  }

  handleInput = (event) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({ value });

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state.name, value);
    }
  }

  handleOptionChange = (value) => {
    this.setState({ value });

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state.name, value);
    }
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

  handleKeyPress = (event) => {
    event.preventDefault();
    if (event.charCode === 13) {
      this.state.refs.select.current.blur();
    }
  }

  handleKeyDowm = (event) => {

    const upKey = [37, 38].includes(event.keyCode);
    const downKey = [39, 40].includes(event.keyCode);

    const selectedItem = document.querySelector('.Select__input__options__option[data-isselected="true"]');

    if (selectedItem) {
      const { parentElement } = selectedItem.parentElement;

      const pos = {
        parentTop: parentElement.offsetTop,
        parentBottom: parentElement.offsetTop + parentElement.clientHeight,
        childTop: parentElement.offsetTop + selectedItem.offsetTop + (0 - parentElement.scrollTop),
        childBottom: parentElement.offsetTop + selectedItem.offsetTop + (0 - parentElement.scrollTop) + selectedItem.clientHeight,
      };

      if (downKey) {
        if (pos.childTop >= pos.parentBottom) {
          const newScroll = ((pos.childTop - pos.parentTop) - (parentElement.clientHeight - (selectedItem.clientHeight + 1))) + parentElement.scrollTop;
          parentElement.scrollTop = newScroll;
        }
      }

      if (upKey) {
        if (pos.childTop < pos.parentTop) {
          parentElement.scrollTop = selectedItem.offsetTop;
        }
      }

    }

  }

  toggleFocus = () => {
    if (this.state.status.isFocused) {
      this.state.refs.select.current.blur();
    } else {
      setTimeout(() => this.state.refs.select.current.focus(), 100);
    }
  }


  render() {
    return (
      <div
        className="Select"
        data-isfocused={this.state.status.isFocused}
        data-isselected={this.state.value !== ''}
      >
        <label htmlFor={this.state.id}>
          <div className="Select__label">{this.state.label}</div>
          <div className="Select__input__element">
            <select
              id={this.state.id}
              ref={this.state.refs.select}
              value={this.state.value}
              onChange={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress}
              onKeyUp={this.handleKeyDowm}
            >
              <option value="">{this.state.placeholder}</option>
              {
                this.state.options.map((option, index) => {
                  return <option key={this.state.id + index} value={option}>{option}</option>;
                })
              }
            </select>
          </div>
        </label>

        <div className="Select__input">
          <div className="Select__input__current" onMouseDown={this.toggleFocus}>
            <div className="text">
              {
                this.state.value === ''
                  ? this.state.placeholder
                  : this.state.value
              }
            </div>
            <div className="icon" />
          </div>
          <div className="Select__input__options">
            <div className="Select__input__options__holder">
              {
                this.state.options.map((option, index) => (
                  <div
                    className="Select__input__options__option"
                    key={this.state.id + index}
                    data-isselected={this.state.value === option}
                    onMouseDown={() => this.handleOptionChange(option)}
                  >
                    {option}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Select;
