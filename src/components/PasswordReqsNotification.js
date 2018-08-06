import React from 'react';

const PasswordReqsNotification = () => 
  <div className="notification is-hidden" id="password-requirements">
    <p className="subtitle is-size-6">
      Password must:
    </p>
    <ul id="conditions" className="">
      <li>
        <i className="fas fa-check has-text-success" style={spacingRight5px}></i> 
        Contain at least 1 lowercase character
      </li>
      <li>
        <i className="fas fa-times has-text-danger" style={spacingRight5px}></i> 
        Contain at least 1 uppercase character
      </li>
      <li>
        <i className="fas fa-times has-text-danger" style={spacingRight5px}></i> 
        Contain at least one numeric character
      </li>
      <li>
        <i className="fas fa-times has-text-danger" style={spacingRight5px}></i> 
        Contain at least one special character
      </li>
      <li>
        <i className="fas fa-times has-text-danger" style={spacingRight5px}></i> 
        Be eight characters or longer
      </li>
    </ul>
  </div>

export default PasswordReqsNotification;

const spacingRight5px = {
  marginRight: "5px"
}