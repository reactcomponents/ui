import React, { Component } from 'react';
import './RadioOption.css';

class RadioOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      groupId: props.groupId,
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
      groupId,
      option,
      status,
    } = this.state;

    return (
      <div
        className="RadioOption"
        data-ischecked={option.isChecked}
        data-isfocused={status.isFocused}
      >
        <label htmlFor={id}>
          <div className="RadioOption__input__element">
            <input
              type="radio"
              id={id}
              name={groupId}
              value={option.value}
              onChange={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="RadioOption__icon">
            <div className="circle" />
          </div>
          {option.label}
        </label>
      </div>
    );
  }

}

export default RadioOption;
