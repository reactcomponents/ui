import React, { Component } from 'react';
import './CheckBox.css';
import CheckBoxOption from './components/CheckBoxOption/CheckBoxOption';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substr(2, 9),
      label: props.label || '',
      options: {},
      onChange: props.onChange,
    };
  }

  componentWillMount() {
    this.setState({
      options: this.createOptions(this.props.options),
    });
  }

  createOptions = (options) => {
    if (options === undefined) {
      return {};
    }

    if (Array.isArray(options)) {

      return options.reduce((optionsList, option, index) => {
        const id = `${this.state.id}_${index}`;
        return {
          ...optionsList,
          [id]: {
            id,
            label: option.label || option,
            value: option.value || option,
            isChecked: false,
          },
        };
      }, {});

    }

    const id = `${this.state.id}_0`;

    return {
      [id]: {
        id,
        label: options,
        value: options,
        isChecked: false,
      },
    };
  };

  handleInput = (event) => {
    const { id, checked } = event.target;
    event.target.blur();

    this.setState({
      options: {
        ...this.state.options,
        [id]: {
          ...this.state.options[id],
          isChecked: checked,
        },
      },
    });
    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state.options);
    }
  }

  render() {
    return (
      <div className="CheckBox">
        <div className="CheckBox__label">{this.state.label}</div>
        {
          Object.keys(this.state.options).map((id) => {
            const option = this.state.options[id];
            return (
              <CheckBoxOption
                key={id}
                id={id}
                option={option}
                handleInput={this.handleInput}
              />
            );
          })
        }
      </div>
    );
  }

}

export default CheckBox;
