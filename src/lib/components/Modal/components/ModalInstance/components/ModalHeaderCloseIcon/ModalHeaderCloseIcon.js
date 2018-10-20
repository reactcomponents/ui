import React from 'react';
import PropTypes from 'prop-types';
import './ModalHeaderCloseIcon.css';

const ModalHeaderCloseIcon = (props) => {
  return (
    <div className="ModalHeaderCloseIcon unselectable" onClick={props.onHide}>
      <div className="icon">
        <div className="line" />
        <div className="line" />
      </div>
    </div>
  );
};

ModalHeaderCloseIcon.propTypes = {
  onHide: PropTypes.func,
};

ModalHeaderCloseIcon.defaultProps = {
  onHide: () => {},
};

export default ModalHeaderCloseIcon;
