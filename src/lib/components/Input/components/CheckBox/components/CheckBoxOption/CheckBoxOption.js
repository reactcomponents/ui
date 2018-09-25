import React, { Component } from 'react';
import './CheckBoxOption.css';

class CheckBoxOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      option: props.option,
      status: {
        isFocused: false,
      },
    };
    this.handleInput = props.handleInput;
  }

  componentWillReceiveProps(props) {
    const { option } = props;
    this.setState({ option });
  }

  shouldComponentUpdate(nextProp, nextState) {
    if (nextProp.option.isChecked !== this.state.option.isChecked) return true;
    if (nextState.option.isChecked !== this.state.option.isChecked) return true;
    if (nextState.status.isFocused !== this.state.status.isFocused) return true;

    return false;
  }

  handleFocus = () => {
    this.setState({
      ...this.state,
      status: {
        ...this.state.status,
        isFocused: true,
      },
    });
  }

  handleBlur = () => {
    this.setState({
      ...this.state,
      status: {
        ...this.state.status,
        isFocused: false,
      },
    });
  }

  render() {
    const {
      id,
      option,
      status,
    } = this.state;

    return (
      <div
        key={id}
        className="CheckBoxOption"
        data-isfocused={status.isFocused}
        data-ischecked={option.isChecked}
      >
        <label htmlFor={id}>
          <div className="CheckBoxOption__input__element">
            <input
              type="checkbox"
              id={id}
              value={option.value}
              onChange={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="CheckBoxOption__icon">
            <div className="CheckBoxOption__icon__tick">
              <div className="line" />
              <div className="line" />
            </div>
          </div>
          {option.label}
        </label>
      </div>
    );
  }

}

export default CheckBoxOption;
