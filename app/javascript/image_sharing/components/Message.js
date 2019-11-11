import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ type, message, className = '' }) => (
  <div
    className={`alert alert-${type !== 'error' ? 'success' : 'danger'} ${className}`}
    role="alert"
  >
    {message}
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Message;
