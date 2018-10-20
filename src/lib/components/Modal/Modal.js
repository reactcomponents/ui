import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import ModalInstance from './components/ModalInstance/ModalInstance';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.id = props.id || uuidv4();
    this.state = {
      isVisible: props.isVisible,
    };
    this.parentElement = this.createParent();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible !== state.isVisible) {
      return {
        isVisible: props.isVisible,
      };
    }
    return null;
  }

  componentDidMount() {
    document.body.appendChild(this.parentElement);
  }

  componentWillUnmount() {
    document.body.removeChild(this.parentElement);
  }

  createParent = () => {
    const parentElement = document.querySelector('div[data-origin="@willsquad/ui"]');

    if (parentElement === null) {
      const element = document.createElement('div');
      element.id = uuidv4();
      element.setAttribute('data-origin', '@willsquad/ui');
      return element;
    }

    return parentElement;
  };

  hideModal = () => {
    this.props.onHide();
  }

  render() {
    return ReactDOM.createPortal(
      <ModalInstance
        id={this.id}
        isVisible={this.state.isVisible}
        type={this.props.type}
        align={this.props.align}
        onHide={this.hideModal}
      >
        { this.props.children }
      </ModalInstance>,
      this.parentElement,
    );
  }

}

Modal.propTypes = {
  id: PropTypes.string,
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  align: PropTypes.string,
};

Modal.defaultProps = {
  id: null,
  isVisible: false,
  type: 'DEFAULT',
  align: 'TOP',
};

export default Modal;
