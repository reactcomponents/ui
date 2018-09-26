import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
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
            __onChange: (name, value) => {
              this.setState({
                ...this.state,
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

  render() {
    return (
      <div className="Form">
        { this.children }
      </div>
    );
  }

}

export default Form;
