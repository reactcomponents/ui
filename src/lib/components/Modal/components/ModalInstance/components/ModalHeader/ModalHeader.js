import React from 'react';
import PropTypes from 'prop-types';
import './ModalHeader.css';
import ModalHeaderCloseIcon from '../ModalHeaderCloseIcon/ModalHeaderCloseIcon';

const ModalHeader = (props) => {
  const {
    title,
    onHide,
  } = props;

  const headerWithTitle = (
    <div className="ModalHeader">
      <div className="ModalHeader__title">{ title }</div>
      <ModalHeaderCloseIcon onHide={onHide} />
    </div>
  );

  const headerNoTitle = (
    <div className="ModalHeader-dupe">
      <ModalHeaderCloseIcon onHide={onHide} />
    </div>
  );

  return title ? headerWithTitle : headerNoTitle;
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  onHide: PropTypes.func,
};

ModalHeader.defaultProps = {
  title: null,
  onHide: () => {},
};

export default ModalHeader;
