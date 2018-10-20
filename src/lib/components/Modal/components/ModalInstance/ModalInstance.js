import React from 'react';
import PropTypes from 'prop-types';
import './ModalInstance.css';
import ModalHeader from './components/ModalHeader/ModalHeader';

const ModalInstance = (props) => {
  const {
    id,
    isVisible,
    type,
    align,
    onHide,
  } = props;

  return (
    <div
      id={id}
      className="Modal"
      data-visible={isVisible}
      data-type={type}
      data-align={align}
    >
      <div
        className="Modal__bg"
        onMouseDown={onHide}
      />
      <div className="Modal__content">
        <div className="Modal__content__box">
          <ModalHeader onHide={onHide} />
          { props.children }
        </div>
      </div>
    </div>
  );
};

ModalInstance.propTypes = {
  id: PropTypes.string,
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  align: PropTypes.string,
  onHide: PropTypes.func,
};

ModalInstance.defaultProps = {
  id: null,
  isVisible: false,
  type: 'DEFAULT',
  align: 'TOP',
  onHide: () => {},
};

export default ModalInstance;
