import React from 'react';

import PasswordReqsNotification from './PasswordReqsNotification';
import conditions from './passwordTests';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);

    // Record of input fields validation tests.
    // Form should ONLY submit if ALL are true
    this.state = {
      username: false,
      passwordReqs: false,
      passwordConfirmed: false,
      email: false
    }

    /**
     * @todo
     * Make form input fields controlled components
     */
  }

  checkUsername(e) {
    // if validation check succeeds, add success notifications to this field
    // AND keep track of successful check pass in state.
    /** @todo keep track of validation in state */

    // conversely, if check fails, activate failure notification and add
    // failed flag to state

    /**
     * if (checkPasses) {
     *    displayNotification(string field, boolean [pass or fail])
     *    this.setState({ username: true });
     * }
     */

    let input = e.target.value;
    let fieldId = e.target.id;

    // Only trigger validation if field is NOT empty
    if (input !== '') {
      
      // console.log('query to DB to make sure username is available...');

      let testCreds = JSON.parse(localStorage.getItem("testCreds"));
      if (input !== testCreds.username) {
        console.log('username available');
        /**
         * 1. display verification notification
         * 2. display respective icon in input field
         * 3. add success OR danger class to input field
         */
        this.displayValidationNotifications(fieldId, true)
      } else {
        console.log('username taken');
        /**
         * 1. display verification notification
         * 2. display respective icon in input field
         * 3. add success OR danger class to input field
         */
        this.displayValidationNotifications(fieldId, false)
      }

    } else {
      // if field is empty, check for validation notifications.
      // if there are any, clear them
      this.clearValidationNotifications(fieldId);
    }
    
  }

  testPassword(e) {
    const password = e.target.value;
    console.log('testing password against requirements...');
    console.log({ password });

    const strongRegex = conditions.strong();
    const mediumRegex = conditions.medium();

    // returns object with following structure
    /**
     * {
     *    passed: Boolean,
     *    strength: String,
     *    tests: {
     *      passed: [ Number ], // indexes of tests passed
     *      failed: [ Number ]  // indexes of tests failed
     *    }
     *    
     * }
     */
    // string password, Object[]
    function analyze(password, tests) {}

    /**
     * We will run a series of tests to ensure password strength
     * 
     * 1. Must be at least 6 characters long
     * 2. MUst not be longer than 20 characters
     * 
     */
  }

  togglePasswordRequirements() {
    let elem = document.getElementById("password-requirements");

    if (elem.classList.contains('is-hidden'))
      elem.classList.remove('is-hidden');
    else
      elem.classList.add('is-hidden');
  }

  checkPasswordsMatch(e) {
    console.log('at this point we check to see if passwords match...');
    let origPass = document.getElementById("password").value;
    let confPass = e.target.value

    if (confPass !== origPass)
      console.log("PASSWORDS DO NOT MATCH");
    else
      console.log("PASSWORDS MATCH");
  }

  checkEmail(e) {
    let email = e.target.value;
    let fieldId = e.target.id;
    
    if (email !== '') {

      // console.log('query to DB to make sure email is available...');

      let testCreds = JSON.parse(localStorage.getItem("testCreds"));
      if (email !== testCreds.email) {
        console.log('email available');
        this.displayValidationNotifications(fieldId, true)
      } else {
        console.log('email already in use');
        this.displayValidationNotifications(fieldId, false)
      }

    } else {
      // if field is empty, check for validation notifications.
      // if there are any, clear them
      this.clearValidationNotifications(fieldId);
    }
  }

  /**
   * @param {String} fieldId
   * @param {Boolean} passed
   */
  displayValidationNotifications(fieldId, passed) {
    // We concatenate "-field" in order to match the
    // id of respective div.field, NOT id of input tag
    let field = document.getElementById(fieldId + "-field");

    // Reference to elements that will be modified
    let input = field.children[1].childNodes.item(fieldId);
    let i = field.children[1].lastChild.firstChild; // child of span.icon.is-right
    let p = field.lastChild.firstChild; // child of div.validation-message

    if (passed) {
      console.log('this is the field we\'re targeting');
      console.log(field);

      console.log("these are the fields we're modifying");
      console.log(input, i, p);

      // Display verification notification
      if (p.classList.contains('is-danger'))
        p.classList.remove('is-danger');

      /**
       * @todo
       * Could use a switch case here to tailor
       * more specific messages based on the field
       */
      p.classList.add('is-success');
      p.innerText = "This "+ fieldId + " is available";

      // Display respective icon
      if (i.classList.contains('is-hidden'))
        i.classList.remove('is-hidden');

      if (i.classList.contains('fa-exclamation-triangle'))
        i.classList.replace('fa-exclamation-triangle', 'fa-check');
      else
        i.classList.add('fa-check');

      // Add success OR danger class to input field
      if (input.classList.contains('is-danger'))
        input.classList.replace('is-danger', 'is-success')
      else
        input.classList.add('is-success');

    } else {
      console.log('this is the field we\'re targeting');
      console.log(field);

      console.log("these are the fields we're modifying");
      console.log(input, i, p);
      // Display verification notification
      if (p.classList.contains('is-success'))
        p.classList.remove('is-success');

      /**
       * @todo
       * Could use a switch case here to tailor
       * more specific messages based on the field
       */
      p.classList.add('is-danger');
      p.innerText = "This " + fieldId + " is not available";

      // Display respective icon
      // let i = span_icon.firstChild;
      if (i.classList.contains('is-hidden'))
        i.classList.remove('is-hidden');

      if (i.classList.contains('fa-check'))
        i.classList.replace('fa-check', 'fa-exclamation-triangle');
      else
        i.classList.add('fa-exclamation-triangle');

      // Add success OR danger class to input field
      if (input.classList.contains('is-success'))
       input.classList.replace('is-success', 'is-danger')
      else
       input.classList.add('is-danger');
    }

  }

  /**
   * @param {String} fieldId
   */
  clearValidationNotifications(fieldId) {
    let field = document.getElementById(fieldId + "-field");
    
    let input = field.children[1].childNodes.item(fieldId);
    let icon;
    let p;
    
    // We first check the child element closest to its field container
    // to save time. If that element has ANY modifiers that indicate
    // a notification (of failure or success) is visible, then we know the other
    // elements will have modifiers as well and so we know to remove everything.
    // However, if the element we check has no notification modifiers, we can
    // safely assume the rest don't have any either, and so we don't do anything.
    if (input.classList.contains('is-danger')) {
      icon = field.children[1].lastChild.firstChild;
      p = field.lastChild.firstChild;

      input.classList.remove('is-danger');
      icon.classList.replace('fa-exclamation-triangle', 'is-hidden');
      p.classList.remove('is-danger');
      p.innerText = "";

    } else if (input.classList.contains('is-success')) {
      icon = field.children[1].lastChild.firstChild;
      p = field.lastChild.firstChild;

      input.classList.remove('is-success');
      icon.classList.replace('fa-check', 'is-hidden');
      p.classList.remove('is-success');
      p.innerText = "";

    } else {
      return
    }
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        
          <div className="card">

            <div className="content has-text-centered">
              <p className="subtitle is-size-3">
                Welcome
              </p>
            </div>

            <div className="card-content">
              
              <form id="loginForm">
                {/* Username */}
                <div className="field" id="username-field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    {/* is-success OR is-danger classes added dynamically */}
                    <input id="username" type="text" className="input" placeholder="Username" onBlur={(e) => this.checkUsername(e)}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>

                    {/* Added dynamically */}
                    <span className="icon is-small is-right">
                      <i className="fas is-hidden" />
                    </span>
                  </div>

                  {/* Added dynamically */}
                  <div className="validation-message">
                    <p className="help"></p>
                  </div>
                </div>

                {/* Password */}
                <div className="field" id="password-field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>

                  <div className="control has-icons-left">
                    <input
                      id="password"
                      type="password"
                      className="input"
                      placeholder="Password"
                      onChange={(e) => this.testPassword(e)}
                      onFocus={this.togglePasswordRequirements}
                      onBlur={this.togglePasswordRequirements}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>

                    <span className="icon is-small is-right">
                      <i />
                    </span>
                  </div>

                  <div className="help">
                    <PasswordReqsNotification />
                  </div>

                </div>

                {/* Confirm Password */}
                <div className="field" id="confirm-password-field">
                  <label htmlFor="confirm_password" className="label">
                    Confirm Password
                  </label>
                  <div className="control has-icons-left">
                    <input id="confirm_password" type="password" className="input" placeholder="Confirm Password" onBlur={(e) => this.checkPasswordsMatch(e)}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="field" id="email-field">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input id="email" type="email"  className="input" placeholder="Email" onBlur={(e) => this.checkEmail(e)}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>

                    <span className="icon is-small is-right">
                      <i className="fas is-hidden"></i>
                    </span>
                  </div>

                  <div className="validation-message">
                    <p className="help"></p>
                  </div>
                </div>
                
                {/* Extra spacing */}
                <div className="field is-horizontal">
                  <div className="field-label"></div>
                </div>

                {/* Button */}
                <div className="field" id="submit-btn-field">
                  <div className="control">
                    <button type="submit" className="button is-link is-fullwidth">
                      Sign Up
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default SignupForm;
