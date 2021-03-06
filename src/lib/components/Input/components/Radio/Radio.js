import React, { Component } from 'react';
import './Radio.css';
import RadioOption from './components/RadioOption/RadioOption';

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substr(2, 9),
      name: props.name,
      label: props.label || '',
      options: {},
      value: '',
      onChange: props.onChange,
      __onChange: props.__onChange || (() => { }),
      __onInit: props.__onInit || (() => { }),
    };
  }

  componentWillMount() {
    this.setState({
      options: this.createOptions(this.props.options),
    });

    this.state.__onInit(this.state.name, this.state.value);
  }

  createOptions = (options) => {
    if (options === undefined) {
      return {};
    }

    let id = `${this.state.id}_0`;

    if (Array.isArray(options)) {

      return options.reduce((optionsList, option, index) => {
        id = `${this.state.id}_${index}`;

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
    const { value } = event.target;

    this.setState({ value });

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.state.name, value);
    }
    this.state.__onChange(this.state.name, value);
  }

  render() {
    return (
      <div className="Radio">
        <div className="Radio__label">{this.state.label}</div>
        {
          Object.keys(this.state.options).map((id) => {
            const option = this.state.options[id];
            return (
              <RadioOption
                key={id}
                id={id}
                groupId={this.state.id}
                option={{
                  ...option,
                  isChecked: option.value === this.state.value,
                }}
                handleInput={this.handleInput}
              />
            );
          })
        }
      </div>
    );
  }

}

export default Radio;
