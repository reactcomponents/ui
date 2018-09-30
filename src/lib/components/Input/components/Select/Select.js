import React, { Component } from 'react';
import './Select.css';
import { Input } from '../../../..';

class Select extends Component {
  constructor(props) {
    super(props);
    this.lastKey = false;
    this.state = {
      id: Math.random().toString(36).substr(2, 9),
      name: props.name,
      label: props.label || '',
      placeholder: props.placeholder,
      options: props.options || [],
      availableOptions: props.options || [],
      availableOptionsHeight: '225px',
      query: '',
      value: '',
      valueIndex: -1,
      onChange: props.onChange,
      __onChange: props.__onChange || (() => { }),
      __onInit: props.__onInit || (() => { }),
      refs: {
        input: React.createRef(),
        options: React.createRef(),
      },
      status: {
        isFocused: false,
      },
    };
  }

  componentWillMount() {
    this.state.__onInit(this.state.name, this.state.value);
  }

  componentDidUpdate() {
    this.handleScroll();
  }

  handleScroll = () => {

    const options = this.state.refs.options.current;
    const boxHeight = options.parentElement.clientHeight;
    const selectedOption = options.querySelector('[data-isselected="true"]');

    if (selectedOption) {

      const { offsetTop, clientHeight } = selectedOption;

      if (this.lastKey === 'down') {

        if (offsetTop >= boxHeight) {
          options.parentElement.scrollTop = (offsetTop + clientHeight) - boxHeight;
        }

      } else if (this.lastKey === 'up') {

        if (offsetTop < options.parentElement.scrollTop) {
          options.parentElement.scrollTop = offsetTop;
        }

      }

    }

  }

  handleInput = (event) => {
    event.preventDefault();
    const { value } = event.target;

    const availableOptions = this.state.options.reduce((optionsList, option) => {
      if (option.toLowerCase().includes(value.toLowerCase())) {
        return [
          ...optionsList,
          option,
        ];
      }
      return optionsList;
    }, []);

    let availableOptionsHeight = '225px';

    if ((availableOptions.length * 45) < 225) {
      availableOptionsHeight = `${availableOptions.length * 45}px`;
    }

    this.setState({
      query: value,
      availableOptions,
      availableOptionsHeight,
    });

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state.name, value);
    }
    this.state.__onChange(this.state.name, value);
  }

  handleOptionChange = (valueIndex) => {
    const value = this.state.options[valueIndex] || '';

    this.setState({
      query: value,
      value,
      valueIndex,
    });

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state.name, value);
    }
    this.state.__onChange(this.state.name, value);
  }

  toggleFocusOnMouseDown = (event) => {
    if (!this.state.status.isFocused) {
      event.target.addEventListener('mouseup', this.toggleFocusOnMouseUp);
    }
  }

  toggleFocusOnMouseUp = (event) => {
    this.state.refs.input.current.focus();
    event.target.removeEventListener('mouseup', this.toggleFocusOnMouseUp);
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
      query: this.state.value,
      availableOptions: this.state.options,
      status: {
        ...this.state.status,
        isFocused: false,
      },
    });
  }

  handleArrowKeys = (upKey, downKey) => {

    let newIndex = this.state.valueIndex;

    if (upKey) {
      if (newIndex > -1) {
        newIndex -= 1;
      }
    } else if (downKey) {
      if (newIndex < (this.state.options.length - 1)) {
        newIndex += 1;
      }
    }

    this.handleOptionChange(newIndex);

  }

  handleKeyDown = (event) => {

    const upKey = [37, 38].includes(event.keyCode);
    const downKey = [39, 40].includes(event.keyCode);
    const enterKey = event.keyCode === 13;
    const escKey = event.keyCode === 27;

    if (upKey || downKey) {
      this.lastKey = upKey ? 'up' : 'down';
      this.handleArrowKeys(upKey, downKey);
    } else if (enterKey) {
      event.preventDefault();
      this.state.refs.input.current.blur();
    } else if (escKey) {
      event.preventDefault();
      this.state.refs.input.current.blur();
    }

  }

  render() {
    return (
      <div
        className="Select"
        data-isfocused={this.state.status.isFocused}
        data-isselected={this.state.value !== ''}
      >
        <div className="Select__overlay">
          <div className="Select__overlay__color Select__overlay__color--dark" />
          <div className="Select__overlay__color Select__overlay__color--white" />
        </div>
        <label htmlFor={this.state.id} className="Select__label">{this.state.label}</label>
        <div
          className="Select__input"
          data-isfocused={this.state.status.isFocused}
        >
          <input
            type={this.state.type}
            id={this.state.id}
            ref={this.state.refs.input}
            placeholder={this.state.placeholder}
            value={this.state.query}
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
          <div className="Select__input__icon" onMouseDown={this.toggleFocusOnMouseDown}>
            <div className="icon" />
          </div>
        </div>

        <div className="Select__options">
          <div 
            className="Select__options__overflow"
            style={{
              height: this.state.availableOptionsHeight,
            }}
          >
            <div className="Select__options__holder" ref={this.state.refs.options}>
              {
                this.state.availableOptions.map((option, index) => (
                  <div
                    className="Select__options__item"
                    key={this.state.id + index}
                    data-index={index}
                    data-isselected={this.state.valueIndex === index}
                    onMouseDown={() => this.handleOptionChange(index)}
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
