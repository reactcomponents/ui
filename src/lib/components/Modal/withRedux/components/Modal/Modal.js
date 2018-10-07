import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Modal.css';
import ModalInstance from '../ModalInstance/ModalInstance';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modals: props.modals,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      modals: props.modals,
    });
  }

  render() {
    return (
      <div className="Modals">
        {
          Object.keys(this.state.modals || {}).map((modal) => {
            return <ModalInstance key={modal} id={modal} />;
          })
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return state.modal;
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
