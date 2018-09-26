import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.input = {};
    this.onSubmit = props.onSubmit;
    this.state = {
      data: {},
    };
  }

  componentWillMount() {

    this.children = this.props.children.reduce((children, child) => {
      let newChild = child;

      if (typeof child.type === 'function') {

        newChild = {
          ...newChild,
          props: {
            ...child.props,
            __onInit: (name, value) => {

              this.input[name] = value;

              this.setState({
                data: {
                  ...this.state.data,
                  ...this.input,
                },
              });

            },
            __onChange: (name, value = null) => {

              this.setState({
                data: {
                  ...this.state.data,
                  [name]: value,
                },
              });

            },
          },
        };

      }

      return [
        ...children,
        newChild,
      ];

    }, []);

  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (typeof this.onSubmit === 'function') {
      this.onSubmit(this.state.data);
    }
  }

  handleKeyDown = (event) => {
    // IMPLEMENT
    if (event.keyCode === 13) {
      console.log(this.state.data);
    }
  }

  render() {
    return (
      <form
        className="Form"
        onKeyDown={this.handleKeyDown}
        onSubmit={this.handleSubmit}
      >
        { this.children }
        <input type="submit" />
      </form>
    );
  }

}

export default Form;
