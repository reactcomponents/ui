import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
  const {
    onClick,
    color,
    backgroundColor,
    hoverOverlay,
  } = props;

  const buttonStyle = {
    backgroundColor,
  };

  const contentStyle = {
    ...props.style,
    color,
  };

  return (
    <div className="Button" style={buttonStyle} onClick={onClick}>
      <div className="Button__overlay" data-color={hoverOverlay} />
      <div className="Button__content" style={contentStyle}>
        { props.children }
      </div>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  hoverOverlay: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
  color: 'black',
  backgroundColor: 'transparent',
  style: {},
  hoverOverlay: 'dark',
};

export default Button;
